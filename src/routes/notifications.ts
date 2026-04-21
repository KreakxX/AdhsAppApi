// src/routes/notifications.ts
import Elysia, { t } from "elysia";
import { db } from "../../db.ts";
import { fcm } from "../firebase.ts";
import jwt from "@elysiajs/jwt";

const jwtGuard = new Elysia({ name: "jwtGuard" }).use(
  jwt({ name: "jwt", secret: process.env.JWT_SECRET! })
).derive({ as: "scoped" }, async ({ jwt, headers, status }) => {
  const auth = headers.authorization;
  if (!auth?.startsWith("Bearer ")) return status(401, "Unauthorized");
  const token = auth.split(" ")[1];
  const payload = await jwt.verify(token);
  if (!payload || !payload.userId) return status(401, "Invalid token");
  return { userId: payload.userId as string };
});

export const notificationRoutes = new Elysia({ prefix: "/notifications" })
  .use(jwtGuard)

  .post("/token", async ({ userId, body }) => {
    await db.user.update({
      where: { id: userId },
      data:  { fcmToken: body.token },
    });
    return { ok: true };
  }, {
    body: t.Object({ token: t.String() }),
    response: { 200: t.Object({ ok: t.Boolean() }), 401: t.String() },
  })

  .post("/trigger", async ({ userId, body, status }) => {
    const routine = await db.routine.findUnique({
      where: { id: body.routineId },
      include: {
        group: {
          include: {
            members: {
              include: { user: true },
            },
          },
        },
      },
    });

    if (!routine) return status(404, "Routine not found");
    if (!routine.group) return status(400, "Routine has no group");

    const triggeringUser = await db.user.findUnique({
      where: { id: userId },
    });

    const tokens = routine.group.members
      .filter((m) => m.userId !== userId && m.user.fcmToken)
      .map((m) => m.user.fcmToken!);

    if (tokens.length === 0) return { ok: true, sent: 0 };

    const notificationBody = body.message
      ?? `${triggeringUser?.name} ist bei "${routine.name}". Schau nach ob du etwas brauchst!`;

    const result = await fcm.sendEachForMulticast({
      tokens,
      notification: {
        title: `${routine.group.name} 📍`,
        body:  notificationBody,
      },
      data: {
        groupId:   routine.group.id,
        routineId: routine.id,
        type:      "GROUP_TRIGGER",
      },
      android: {
        priority: "high",
        notification: { sound: "default", priority: "max" },
      },
      apns: {
        payload: { aps: { sound: "default", badge: 1 } },
      },
    });

    const groupMembersWithTokens = routine.group.members.filter(
      (m) => m.userId !== userId && m.user.fcmToken
    );

    await Promise.all(
      result.responses.map(async (resp, i) => {
        if (
          !resp.success &&
          resp.error?.code === "messaging/invalid-registration-token"
        ) {
          const member = groupMembersWithTokens[i];
          if (member) {
            await db.user.update({
              where: { id: member.userId },
              data:  { fcmToken: null },
            });
          }
        }
      })
    );

    return { ok: true, sent: result.successCount };
  }, {
    body: t.Object({
      routineId: t.String(),
      message:   t.Optional(t.String()),
    }),
    response: {
      200: t.Object({ ok: t.Boolean(), sent: t.Optional(t.Number()) }),
      400: t.String(),
      401: t.String(),
      404: t.String(),
    },
  });