import jwt from "@elysiajs/jwt";
import Elysia, { t } from "elysia";
import { db } from "../../db.ts";
import { groupPlain } from "@/generated/prismabox/group.ts";
import { groupMemberPlain } from "@/generated/prismabox/groupMember.ts";
import { userPlain } from "@/generated/prismabox/user.ts";
import { routinePlain } from "@/generated/prismabox/routine.ts";
import { routineItem, routineItemPlain } from "@/generated/prismabox/routineItem.ts";
import { getCachedOrFetch } from "../types.ts";
import { dragonFlyCache } from "../cache.ts";
import superjson from 'superjson';
import { locationPlain } from "@/generated/prismabox/location.ts";

const groupsKey = (userId: string) => `groups:${userId}`;

type GroupsCache = { del: (key: string) => Promise<boolean> };

/**
 * A group payload is shared state sitting behind a per-user cache key, so a
 * write by one member leaves every *other* member's cached copy stale until its
 * TTL expires — up to five minutes of missing members, reminders or checkmarks.
 * Handlers only ever rewrite their own caller's key, so the rest have to be
 * dropped explicitly; the next GET then refetches.
 *
 * Pass `exceptUserId` where the handler rewrites the actor's key itself with
 * fresh data. Omit it when nothing does, so the actor is invalidated too.
 */
async function invalidateUserCaches(
  cache: GroupsCache,
  userIds: string[],
  exceptUserId?: string,
): Promise<void> {
  await Promise.all(
    userIds
      .filter((id) => id !== exceptUserId)
      .map((id) => cache.del(groupsKey(id))),
  );
}

/** Same, for a group that still exists — looks its members up itself. */
async function invalidateGroupCaches(
  cache: GroupsCache,
  groupId: string,
  exceptUserId?: string,
): Promise<void> {
  const members = await db.groupMember.findMany({
    where: { groupId },
    select: { userId: true },
  });
  await invalidateUserCaches(
    cache,
    members.map((m) => m.userId),
    exceptUserId,
  );
}

const jwtGuard = new Elysia({ name: "jwtGuard" }).use(dragonFlyCache).use(
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

  .post("/", async ({ userId, body,store }) => {
    const group = await db.group.create({
  data: {
    name: body.name,
    createdByUserId: userId,
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
       items: true,
       locations: true
      }
    },  },
}); 

  const groups = await db.group.findMany({
    where: {
      members: { some: { userId } },
    },
    include: {
      members: { include: { user: true } },
      routines: { include: { items: true, locations: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  await store.cache.set(groupsKey(userId), superjson.stringify({groups: groups}));

    return { group };
  }, {
    body: t.Object({
      name: t.String(),
     
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

 .get("/", async ({ userId, store }) => {
  return getCachedOrFetch(
    groupsKey(userId),
    async () => {
      const groups = await db.group.findMany({
        where: {
          members: { some: { userId } },
        },
        include: {
          members: {
            include: { user: true },
          },
          routines: {
            include: { items: true, locations:true},
          },
        },
        orderBy: { createdAt: "desc" },
      });

      return { groups };
    },
    store.cache,
    300
  );
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
               t.Object({locations: t.Array(locationPlain)}), 
               t.Object({items: t.Array(routineItemPlain)})
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

  .post("/join", async ({ userId, body, status,store }) => {
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

    // After the create, so the invalidation covers everyone who was already in
    // the group — they all have a member list that is now one short.
    await invalidateGroupCaches(store.cache, group.id, userId);

    const updated = await db.group.findUnique({
      where:   { id: group.id },
      include: { members: true, routines: true },
    });

     const groups = await db.group.findMany({
    where: {
      members: { some: { userId } },
    },
    include: {
      members: { include: { user: true } },
      routines: { include: { items: true, locations: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  await store.cache.set(groupsKey(userId), superjson.stringify({groups: groups}));

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

  .delete("/leave", async ({ userId, body, status,store }) => {
    const membership = await db.groupMember.findUnique({
      where: { groupId_userId: { groupId: body.groupId, userId } },
    });

    if (!membership) return status(404, "Mitgliedschaft nicht gefunden");

    await db.groupMember.delete({
      where: { groupId_userId: { groupId: body.groupId, userId } },
    });

    // After the delete this is exactly the members who stay behind — the
    // leaver's own key is rewritten below.
    await invalidateGroupCaches(store.cache, body.groupId);

     const groups = await db.group.findMany({
    where: {
      members: { some: { userId } },
    },
    include: {
      members: { include: { user: true } },
      routines: { include: { items: true, locations: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  await store.cache.set(groupsKey(userId), superjson.stringify({groups: groups}));

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

  .post("/reminders", async ({ userId, body, status,store }) => {
    const membership = await db.groupMember.findUnique({
      where: { groupId_userId: { groupId: body.groupId, userId } },
    });

    if (!membership) return status(403, "Nicht Mitglied dieser Gruppe");

    const reminder = await db.routine.create({
      data: {
        name:         body.name,
        radius:        body.radius        ?? 80,
        triggerHour:   body.triggerHour   ,
        triggerMinute: body.triggerMinute ,
  locations:      body.locations.length ? {create: body.locations.map((location,i) =>({
          latitude: location.latitude,
          longitude: location.longitude
        }))}: undefined,        freeSpace:     body.freeSpace,
        street:        body.street,
        streetNumber:  body.streetNumber,
        assignedUserIds: body.assignedUserIds,
        triggerOnExit: body.triggerOnExit,
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
    include: { items: true, locations: true },

    });

    await invalidateGroupCaches(store.cache, body.groupId, userId);

     const groups = await db.group.findMany({
    where: {
      members: { some: { userId } },
    },
    include: {
      members: { include: { user: true } },
      routines: { include: { items: true,locations: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  await store.cache.set(groupsKey(userId), superjson.stringify({groups: groups}));

    return { reminder };
  }, {
    body: t.Object({
      name: t.String(),
      groupId:       t.String(),
      radius:        t.Optional(t.Number()),
      triggerHour:   t.Optional(t.Nullable(t.Number())),
      triggerMinute: t.Optional(t.Nullable(t.Number())),
      triggerOnExit: t.Optional(t.Boolean()), 
      locations:    t.Array( t.Object({latitude: t.Number(), longitude: t.Number()})),
      street:        t.Optional(t.Nullable(t.String())),
      freeSpace:      t.Optional(t.Nullable(t.Number())),
      streetNumber:  t.Optional(t.Nullable(t.String())),
      // Optional: empty / missing = everyone in the group.
      assignedUserIds: t.Optional(t.Array(t.String())),

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
        t.Object({locations: t.Array(locationPlain)}) 
      ]),
    }),      401: t.String(),
      403: t.String(),
    },
  })

  .delete("/reminders", async ({ userId, body, status,store }) => {
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

    await invalidateGroupCaches(store.cache, reminder.groupId, userId);

     const groups = await db.group.findMany({
    where: {
      members: { some: { userId } },
    },
    include: {
      members: { include: { user: true } },
      routines: { include: { items: true, locations: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  await store.cache.set(groupsKey(userId), superjson.stringify({groups: groups}));

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

  .delete("/:id", async ({ userId, params, status, store }) => {
    const group = await db.group.findUnique({
      where: { id: params.id },
      include: { members: true },
    });

    if (!group) return status(404, "Gruppe nicht gefunden");

    const isMember = group.members.some((m) => m.userId === userId);
    if (!isMember) return status(403, "Nicht Mitglied dieser Gruppe");

    if (group.createdByUserId && group.createdByUserId !== userId) {
      return status(403, "Nur der Ersteller kann diese Gruppe löschen");
    }

    await db.group.delete({ where: { id: params.id } });

    // The memberships are gone with the group, so this uses the list loaded
    // before the delete — looking them up now would return nothing.
    await invalidateUserCaches(
      store.cache,
      group.members.map((m) => m.userId),
      userId,
    );

     const groups = await db.group.findMany({
    where: {
      members: { some: { userId } },
    },
    include: {
      members: { include: { user: true } },
      routines: { include: { items: true, locations: true }},
    },
    orderBy: { createdAt: "desc" },
  });

  await store.cache.set(groupsKey(userId), superjson.stringify({groups: groups}));
    return { message: "Gruppe gelöscht" };
  }, {
    params: t.Object({ id: t.String() }),
    response: {
      200: t.Object({ message: t.String() }),
      401: t.String(),
      403: t.String(),
      404: t.String(),
    },
  })
.patch("/reminders/:reminderId/items/:itemId", async ({ userId, params, status,store }) => {
  const reminder = await db.routine.findUnique({
    where: { id: params.reminderId },
  });

  if (!reminder?.groupId) return status(404, "Erinnerung nicht gefunden");

  const membership = await db.groupMember.findUnique({
    where: { groupId_userId: { groupId: reminder.groupId, userId } },
  });

  if (!membership) return status(403, "Nicht Mitglied dieser Gruppe");
      
    const ids = (reminder.assignedUserIds ?? []) as string[];
    if (ids.length > 0 && !ids.includes(userId)) {
      return status(403, "Not Assigned to this Task");
    }

  const existing = await db.routineItem.findFirst({
    where: { id: params.itemId, routineId: params.reminderId },
  });
  if (!existing) return status(404, "Eintrag nicht gefunden");

  const item = await db.routineItem.update({
    where: { id: existing.id },
    data: {
      checkedBy: userId,
      checkedAt: new Date(),
    },
  });

  await invalidateGroupCaches(store.cache, reminder.groupId, userId);

   const groups = await db.group.findMany({
    where: {
      members: { some: { userId } },
    },
    include: {
      members: { include: { user: true } },
      routines: { include: { items: true, locations: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  await store.cache.set(groupsKey(userId), superjson.stringify({groups: groups}));

  return { item };
}, {
  params: t.Object({ reminderId: t.String(), itemId: t.String() }),
  response: {
    200: t.Object({ item: t.Any() }),
    403: t.String(),
    404: t.String(),
  },
})
// Uncheck an item again (tapped by mistake, or bought after all). Same rules
// as checking: member of the group and assigned (empty list = everyone).
.delete("/reminders/:reminderId/items/:itemId", async ({ userId, params, status, store }) => {
  const reminder = await db.routine.findUnique({
    where: { id: params.reminderId },
  });

  if (!reminder?.groupId) return status(404, "Erinnerung nicht gefunden");

  const membership = await db.groupMember.findUnique({
    where: { groupId_userId: { groupId: reminder.groupId, userId } },
  });

  if (!membership) return status(403, "Nicht Mitglied dieser Gruppe");

  const ids = (reminder.assignedUserIds ?? []) as string[];
  if (ids.length > 0 && !ids.includes(userId)) {
    return status(403, "Not Assigned to this Task");
  }

  // Scoped to this reminder, so an item id from another group can't be
  // unchecked through it.
  const { count } = await db.routineItem.updateMany({
    where: { id: params.itemId, routineId: params.reminderId },
    data: { checkedBy: null, checkedAt: null },
  });

  if (count === 0) return status(404, "Eintrag nicht gefunden");

  await invalidateGroupCaches(store.cache, reminder.groupId);

  return { ok: true };
}, {
  params: t.Object({ reminderId: t.String(), itemId: t.String() }),
  response: {
    200: t.Object({ ok: t.Boolean() }),
    403: t.String(),
    404: t.String(),
  },
})
.post("/mute", async ({ userId, body, status, store }) => {
  const member = await db.groupMember.findUnique({
    where: { groupId_userId: { groupId: body.groupId, userId } },
  });

  if (!member) return status(404, "Not a member of this group");

  await db.groupMember.update({
    where: { groupId_userId: { groupId: body.groupId, userId } },
    data: { muted: true },
  });

  // `muted` rides along in every member entry of the group payload, so this
  // changes what everyone sees — and nothing here rewrites the caller's key.
  await invalidateGroupCaches(store.cache, body.groupId);

  return { ok: true };
}, {
  body: t.Object({
    groupId:  t.String(),
  }),
})

.delete("/mute", async ({ userId, body, status, store }) => {
  const member = await db.groupMember.findUnique({
    where: { groupId_userId: { groupId: body.groupId, userId } },
  });

  if (!member) return status(404, "Not a member of this group");

  await db.groupMember.update({
    where: { groupId_userId: { groupId: body.groupId, userId } },
    data: { muted: null },
  });

  await invalidateGroupCaches(store.cache, body.groupId);

  return { ok: true };
}, {
  body: t.Object({ groupId: t.String() }),
})
.put("/add/routine", async({userId, body, status, store}) =>{
  const {groupId, routineId} = body;

  const membership = await db.groupMember.findUnique({
    where: { groupId_userId: { groupId, userId } },
  });
  if (!membership) return status(403, "Nicht Mitglied dieser Gruppe");

  const routine = await db.routine.findUnique({ where: { id: routineId } });
  if (!routine) return status(404, "Routine nicht gefunden");
  if (routine.userId !== userId) return status(403, "Keine Berechtigung für diese Routine");

  await db.group.update({
    where: { id: groupId },
    data: {
      routines: {
        connect: { id: routineId },
      },
    },
  });

  await db.routine.update({where: {id: routineId}, data:{groupId: groupId}})

  // Turning a personal routine into a group one adds it to everybody's group
  // payload. No `exceptUserId` — this handler writes no cache at all, so the
  // mover's own view would otherwise not show it either.
  await invalidateGroupCaches(store.cache, groupId);

  return { success: true };

},{
  body: t.Object({
    groupId: t.String(),
    routineId: t.String()
  }),
  response: {
    200: t.Object({ success: t.Boolean() }),
    403: t.String(),
    404: t.String(),
  }
})

.put("/remove/routine", async ({ userId, body, status, store }) => {
  const { groupId, routineId } = body;

  const membership = await db.groupMember.findUnique({
    where: { groupId_userId: { groupId, userId } },
  });
  if (!membership) return status(403, "Nicht Mitglied dieser Gruppe");

  await db.group.update({
    where: { id: groupId },
    data: {
      routines: {
        disconnect: { id: routineId },
      },
    },
  });

  await db.routine.update({
    where: { id: routineId },
    data: { groupId: null },
  });

  await invalidateGroupCaches(store.cache, groupId, userId);

  const groups = await db.group.findMany({
    where: {
      members: { some: { userId } },
    },
    include: {
      members: { include: { user: true } },
      routines: { include: { items: true, locations: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  await store.cache.set(groupsKey(userId), superjson.stringify({ groups }));

  return { success: true };
}, {
  body: t.Object({
    groupId: t.String(),
    routineId: t.String(),
  }),
  response: {
    200: t.Object({ success: t.Boolean() }),
    403: t.String(),
  },
})