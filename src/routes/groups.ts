import jwt from "@elysiajs/jwt";
import Elysia, { t } from "elysia";
import { db } from "../../db.ts";
import { groupPlain } from "@/generated/prismabox/group.ts";
import { groupMemberPlain } from "@/generated/prismabox/groupMember.ts";
import { sharedReminderPlain } from "@/generated/prismabox/sharedReminder.ts";
import { userPlain } from "@/generated/prismabox/user.ts";

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

export const groupRoutes = new Elysia({ prefix: "/groups" })
  .use(jwtGuard)

  .post("/", async ({ userId, body }) => {
    const group = await db.group.create({
  data: {
    name: body.name,
    members: {
      create: { userId },
    },
  },
  include: {
    members: {
      include: {
        user: true, 
      },
    },
    reminders: true,
  },
});

    return { group };
  }, {
    body: t.Object({
      name:  t.String(),
      emoji: t.Optional(t.String()),
    }),
    response: {
200: t.Object({ group: t.Composite([groupPlain, t.Object({ reminders: t.Array(sharedReminderPlain) }), t.Object({ members: t.Array(t.Composite([groupMemberPlain, t.Object({ user: userPlain })])) })]) }),
 401: t.String(),
    },
  })

  .get("/", async ({ userId }) => {
    const groups = await db.group.findMany({
      where: {
        members: { some: { userId } },
      },
      include: {
        members: {
          include:{
            user: true
          }
        },
        reminders: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return { groups };
  }, {
    response: {
      200: t.Object({ groups: t.Array( t.Composite([groupPlain, t.Object({ reminders: t.Array(sharedReminderPlain) }), t.Object({ members: t.Array(t.Composite([groupMemberPlain, t.Object({ user: userPlain })])) })]))}),
      401: t.String(),
    },
  })

  .post("/join", async ({ userId, body, status }) => {
    const group = await db.group.findUnique({
      where:   { inviteCode: body.inviteCode },
      include: { members: true },
    });

    if (!group) return status(404, "Gruppe nicht gefunden");

    const alreadyMember = group.members.some((m) => m.userId === userId);
    if (alreadyMember) return status(400, "Du bist bereits Mitglied");

    await db.groupMember.create({
      data: { groupId: group.id, userId },
    });

    const updated = await db.group.findUnique({
      where:   { id: group.id },
      include: { members: true, reminders: true },
    });

    return { group: updated };
  }, {
    body: t.Object({
      inviteCode: t.String(),
    }),
    response: {
      200: t.Object({ group: t.Any() }),
      400: t.String(),
      401: t.String(),
      404: t.String(),
    },
  })

  .delete("/leave", async ({ userId, body, status }) => {
    const membership = await db.groupMember.findUnique({
      where: { groupId_userId: { groupId: body.groupId, userId } },
    });

    if (!membership) return status(404, "Mitgliedschaft nicht gefunden");

    await db.groupMember.delete({
      where: { groupId_userId: { groupId: body.groupId, userId } },
    });

    return { message: "Gruppe verlassen" };
  }, {
    body: t.Object({
      groupId: t.String(),
    }),
    response: {
      200: t.Object({ message: t.String() }),
      401: t.String(),
      404: t.String(),
    },
  })

  .post("/reminders", async ({ userId, body, status }) => {
    const membership = await db.groupMember.findUnique({
      where: { groupId_userId: { groupId: body.groupId, userId } },
    });

    if (!membership) return status(403, "Nicht Mitglied dieser Gruppe");

    const reminder = await db.sharedReminder.create({
      data: {
        title:         body.title,
        radius:        body.radius        ?? 80,
        triggerHour:   body.triggerHour   ?? 0,
        triggerMinute: body.triggerMinute ?? 0,
        latitude:      body.latitude,
        longitude:     body.longitude,
        street:        body.street,
        streetNumber:  body.streetNumber,
        groupId:       body.groupId,
      },
    });

    return { reminder };
  }, {
    body: t.Object({
      groupId:       t.String(),
      title:         t.String(),
      radius:        t.Optional(t.Number()),
      triggerHour:   t.Optional(t.Number()),
      triggerMinute: t.Optional(t.Number()),
      latitude:      t.Optional(t.Nullable(t.Number())),
      longitude:     t.Optional(t.Nullable(t.Number())),
      street:        t.Optional(t.Nullable(t.String())),
      streetNumber:  t.Optional(t.Nullable(t.String())),
    }),
    response: {
      200: t.Object({ reminder: t.Any() }),
      401: t.String(),
      403: t.String(),
    },
  })

  .delete("/reminders", async ({ userId, body, status }) => {
    const reminder = await db.sharedReminder.findUnique({
      where: { id: body.reminderId },
    });

    if (!reminder) return status(404, "Erinnerung nicht gefunden");

    const membership = await db.groupMember.findUnique({
      where: { groupId_userId: { groupId: reminder.groupId, userId } },
    });

    if (!membership) return status(403, "Nicht Mitglied dieser Gruppe");

    await db.sharedReminder.delete({ where: { id: body.reminderId } });

    return { message: "Erinnerung gelöscht" };
  }, {
    body: t.Object({
      reminderId: t.String(),
    }),
    response: {
      200: t.Object({ message: t.String() }),
      401: t.String(),
      403: t.String(),
      404: t.String(),
    },
  })

  .delete("/:id", async ({ userId, params, status }) => {
    const membership = await db.groupMember.findUnique({
      where: { groupId_userId: { groupId: params.id, userId } },
    });

    if (!membership) return status(403, "Nicht Mitglied dieser Gruppe");

    await db.group.delete({ where: { id: params.id } });

    return { message: "Gruppe gelöscht" };
  }, {
    params: t.Object({ id: t.String() }),
    response: {
      200: t.Object({ message: t.String() }),
      401: t.String(),
      403: t.String(),
    },
  });