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
    const reminder = await db.sharedReminder.findUnique({
      where:   { id: body.reminderId },
      include: {
        group: {
          include: {
            members: { include: { user: true } },
          },
        },
      },
    });

    if (!reminder) return status(404, "Reminder not found");

    const triggeringUser = await db.user.findUnique({
      where: { id: userId },
    });

    // everyone except the person who triggered it
    const tokens = reminder.group.members
      .filter((m) => m.userId !== userId && m.user.fcmToken)
      .map((m) => m.user.fcmToken!);

    if (tokens.length === 0) return { ok: true, sent: 0 };

    const result = await fcm.sendEachForMulticast({
      tokens,
      notification: {
        title: `${reminder.group.name} 📍`,
        body:  `${triggeringUser?.name} ist bei "${reminder.title}". Schau nach ob du etwas brauchst!`,
      },
      data: {
        groupId:    reminder.group.id,
        reminderId: reminder.id,
        type:       "GROUP_TRIGGER",
      },
      android: {
        priority: "high",
        notification: { sound: "default", priority: "max" },
      },
      apns: {
        payload: { aps: { sound: "default", badge: 1 } },
      },
    });

    result.responses.forEach(async (resp:any, i:any) => {
      if (!resp.success && resp.error?.code === "messaging/invalid-registration-token") {
        const member = reminder.group.members.filter(
          (m) => m.userId !== userId && m.user.fcmToken
        )[i];
        if (member) {
          await db.user.update({
            where: { id: member.userId },
            data:  { fcmToken: null },
          });
        }
      }
    });

    return { ok: true, sent: result.successCount };
  }, {
    body: t.Object({ reminderId: t.String() }),
    response: {
      200: t.Object({ ok: t.Boolean(), sent: t.Optional(t.Number()) }),
      401: t.String(),
      404: t.String(),
    },
  });