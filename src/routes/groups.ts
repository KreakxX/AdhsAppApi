import jwt from "@elysiajs/jwt";
import Elysia, { t } from "elysia";
import { db } from "../../db.ts";
import { groupPlain } from "@/generated/prismabox/group.ts";
import { groupMemberPlain } from "@/generated/prismabox/groupMember.ts";
import { userPlain } from "@/generated/prismabox/user.ts";
import { routinePlain } from "@/generated/prismabox/routine.ts";
import { routineItem, routineItemPlain } from "@/generated/prismabox/routineItem.ts";

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
routines: {
      include:{
       items: true
      }
    },  },
});

    return { group };
  }, {
    body: t.Object({
      name:  t.String(),
      emoji: t.Optional(t.String()),
    }),
    response: {
200: t.Object({
    group: 
      t.Composite([
        groupPlain,
        t.Object({
          routines: t.Array(
            t.Composite([
              routinePlain,
              t.Object({ items: t.Array(routineItemPlain) }), 
            ])
          ),
        }),
        t.Object({
          members: t.Array(
            t.Composite([
              groupMemberPlain,
              t.Object({ user: userPlain }),
            ])
          ),
        }),
      ])
  }), 401: t.String(),
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
       routines: {
      include:{
       items: true
      }
    },
      },
      orderBy: { createdAt: "desc" },
    });

    return { groups };
  }, {
    response: {
 200: t.Object({
    groups: t.Array(
      t.Composite([
        groupPlain,
        t.Object({
          routines: t.Array(
            t.Composite([
              routinePlain,
              t.Object({ items: t.Array(routineItemPlain) }), 
            ])
          ),
        }),
        t.Object({
          members: t.Array(
            t.Composite([
              groupMemberPlain,
              t.Object({ user: userPlain }),
            ])
          ),
        }),
      ])
    ),
  }),
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
      include: { members: true, routines: true },
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

    const reminder = await db.routine.create({
      data: {
        name:         body.name,
        radius:        body.radius        ?? 80,
        triggerHour:   body.triggerHour   ?? 0,
        triggerMinute: body.triggerMinute ?? 0,
        latitude:      body.latitude,
        longitude:     body.longitude,
        freeSpace:     body.freeSpace,
        street:        body.street,
        streetNumber:  body.streetNumber,
        groupId:       body.groupId,
        userId: userId,
        items: body.items?.length ? {
        create: body.items.map((item) => ({
          name:        item.name,
          description: item.description ?? null,
          imageUrl:    item.imageUrl    ?? null,
        })),
      } : undefined,
    },
    include: { items: true },
    
    });

    return { reminder };
  }, {
    body: t.Object({
      name: t.String(),
      groupId:       t.String(),
      radius:        t.Optional(t.Number()),
      triggerHour:   t.Optional(t.Number()),
      triggerMinute: t.Optional(t.Number()),
      latitude:      t.Optional(t.Nullable(t.Number())),
      longitude:     t.Optional(t.Nullable(t.Number())),
      street:        t.Optional(t.Nullable(t.String())),
      freeSpace:      t.Optional(t.Nullable(t.Number())),
      streetNumber:  t.Optional(t.Nullable(t.String())),
      items: t.Optional(t.Array(t.Object({
      name:        t.String(),
      description: t.Optional(t.Nullable(t.String())),
      imageUrl:    t.Optional(t.Nullable(t.String())),
    }))),
    }),
    response: {
 200: t.Object({
      reminder: t.Composite([
        routinePlain,
        t.Object({ items: t.Array(routineItemPlain) }), 
      ]),
    }),      401: t.String(),
      403: t.String(),
    },
  })

  .delete("/reminders", async ({ userId, body, status }) => {
    const reminder = await db.routine.findUnique({
      where: { id: body.reminderId },
    });

    if (!reminder) return status(404, "Erinnerung nicht gefunden");

    if(!reminder.groupId) return status(404, "Erinnerung nicht in der Gruppe gefunden");
      
    if (reminder.userId !== userId) return status(403, "Nur der Ersteller kann diese Erinnerung löschen");

    const membership = await db.groupMember.findUnique({
      where: { groupId_userId: { groupId: reminder.groupId, userId } },
    });

    if (!membership) return status(403, "Nicht Mitglied dieser Gruppe");

    await db.routine.delete({ where: { id: body.reminderId } });

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
  })
.patch("/reminders/:reminderId/items/:itemId", async ({ userId, params, status }) => {
  const reminder = await db.routine.findUnique({
    where: { id: params.reminderId },
  });

  if (!reminder?.groupId) return status(404, "Erinnerung nicht gefunden");

  const membership = await db.groupMember.findUnique({
    where: { groupId_userId: { groupId: reminder.groupId, userId } },
  });

  if (!membership) return status(403, "Nicht Mitglied dieser Gruppe");

  const item = await db.routineItem.update({
    where: { id: params.itemId },
    data: {
      checkedBy: userId,
      checkedAt: new Date(),
    },
  });

  return { item };
}, {
  params: t.Object({ reminderId: t.String(), itemId: t.String() }),
  response: {
    200: t.Object({ item: t.Any() }),
    403: t.String(),
    404: t.String(),
  },
})
.delete("/reminders/:reminderId/reset", async ({ params }) => {
  await db.routineItem.updateMany({
    where: { routineId: params.reminderId },
    data: { checkedBy: null, checkedAt: null },
  });
  return { ok: true };
})