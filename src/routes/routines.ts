import jwt from "@elysiajs/jwt";
import Elysia, { t } from "elysia";
import { db } from "../../db.ts";
import { routinePlain } from "@/generated/prismabox/routine.ts";
import { routineItem, routineItemPlain } from "@/generated/prismabox/routineItem.ts";

const jwtGuard = new Elysia({ name: "jwtGuard" }).use(
  jwt({ name: "jwt", secret: process.env.JWT_SECRET! })
).derive({ as: "scoped" }, async ({ jwt, headers, status }) => {
  const auth = headers.authorization;
  if (!auth?.startsWith("Bearer ")) return status(401, "No Authorization Header found");

  const token = auth.split(" ")[1];
  const payload = await jwt.verify(token);
  if (!payload || !payload.userId) return status(401, "Invalid or expired token");

  return { userId: payload.userId as string };
});

export const routineRoutes = new Elysia({ prefix: "/routines" })
  .use(jwtGuard)

  .get("/", async ({ userId, status }) => {
    const routines = await db.routine.findMany({
      where:   { userId },
      include: { items: true },
      orderBy: { createdAt: "desc" },
    });
    return { routines };
  }, {
    response: {
      200: t.Object({routines: t.Array(t.Composite([routinePlain, t.Object({items: t.Array(routineItemPlain)})]))}),
      401: t.String(),
    },
  })

  .get("/:id", async ({ userId, params, status }) => {
    const routine = await db.routine.findUnique({
      where:   { id: params.id },
      include: { items: true },
    });

    if (!routine)              return status(404, "Routine not found");
    if (routine.userId !== userId) return status(403, "Forbidden");

    return { routine };
  }, {
    params: t.Object({ id: t.String() }),
    response: {
      200: t.Object({routine: routinePlain}),
      401: t.String(),
      403: t.String(),
      404: t.String(),
    },
  })

  .post("/", async ({ userId, body, status }) => {
    const routine = await db.routine.create({
      data: {
        name:          body.name,
        radius:        body.radius         ?? 50,
        triggerHour:   body.triggerHour    ?? 0,
        triggerMinute: body.triggerMinute  ?? 0,
        freeSpace:     body.freeSpace      ?? 5,
        latitude:      body.latitude,
        longitude:     body.longitude,
        street:        body.street,
        streetNumber:  body.streetNumber,
        userId,
        items: body.items?.length
          ? { create: body.items.map((item, i) => ({
              name:        item.name,
              description: item.description,
              imageUrl:    item.imageUrl,
            })) }
          : undefined,
      },
      include: { items: true },
    });

    return { routine };
  }, {
    body: t.Object({
      name:          t.String(),
      radius:        t.Optional(t.Number()),
      triggerHour:   t.Optional(t.Number()),
      triggerMinute: t.Optional(t.Number()),
      freeSpace:     t.Optional(t.Number()),
      latitude:      t.Optional(t.Nullable(t.Number())),
      longitude:     t.Optional(t.Nullable(t.Number())),
      street:        t.Optional(t.Nullable(t.String())),
      streetNumber:  t.Optional(t.Nullable(t.String())),
      items: t.Optional(t.Array(t.Object({
        name:        t.String(),
        description: t.Optional(t.Nullable(t.String())),
        imageUrl:    t.Optional(t.Nullable(t.String())),
      }))),
    }),
    response: {
      200: t.Object({routine: t.Composite([routinePlain, t.Object({items: t.Array(routineItemPlain)})])}),
      401: t.String(),
    },
  })

  .patch("/:id", async ({ userId, params, body, status }) => {
    const existing = await db.routine.findUnique({ where: { id: params.id } });

    if (!existing)                 return status(404, "Routine not found");
    if (existing.userId !== userId) return status(403, "Forbidden");

    const routine = await db.routine.update({
      where: { id: params.id },
      data: {
        name:          body.name,
        radius:        body.radius,
        triggerHour:   body.triggerHour,
        triggerMinute: body.triggerMinute,
        freeSpace:     body.freeSpace,
        latitude:      body.latitude,
        longitude:     body.longitude,
        street:        body.street,
        streetNumber:  body.streetNumber,
      },
      include: { items: true },
    });

    return { routine };
  }, {
    params: t.Object({ id: t.String() }),
    body: t.Object({
      name:          t.Optional(t.String()),
      radius:        t.Optional(t.Number()),
      triggerHour:   t.Optional(t.Number()),
      triggerMinute: t.Optional(t.Number()),
      freeSpace:     t.Optional(t.Number()),
      latitude:      t.Optional(t.Nullable(t.Number())),
      longitude:     t.Optional(t.Nullable(t.Number())),
      street:        t.Optional(t.Nullable(t.String())),
      streetNumber:  t.Optional(t.Nullable(t.String())),
    }),
    response: {
      200: t.Object({ routine: t.Any() }),
      401: t.String(),
      403: t.String(),
      404: t.String(),
    },
  })

  .delete("/:id", async ({ userId, params, status }) => {
    const existing = await db.routine.findUnique({ where: { id: params.id } });

    if (!existing)                 return status(404, "Routine not found");
    if (existing.userId !== userId) return status(403, "Forbidden");

    await db.routine.delete({ where: { id: params.id } });

    return { message: "Routine deleted" };
  }, {
    params: t.Object({ id: t.String() }),
    response: {
      200: t.Object({ message: t.String() }),
      401: t.String(),
      403: t.String(),
      404: t.String(),
    },
  })

  .patch("/:id/items/:itemId", async ({ userId, params, body, status }) => {
    const routine = await db.routine.findUnique({ where: { id: params.id } });

    if (!routine)                 return status(404, "Routine not found");
    if (routine.userId !== userId) return status(403, "Forbidden");

    const item = await db.routineItem.update({
      where: { id: params.itemId },
      data:  { checkedAt: new Date, checkedBy: body.checkedBy },
    });

    return { item };
  }, {
    params: t.Object({ id: t.String(), itemId: t.String() }),
    body:   t.Object({ checkedBy: t.String() }),
    response: {
      200: t.Object({ item: t.Any() }),
      401: t.String(),
      403: t.String(),
      404: t.String(),
    },
  })

  .delete("/:id/items/:itemId", async ({ userId, params, status }) => {
    const routine = await db.routine.findUnique({ where: { id: params.id } });

    if (!routine)                 return status(404, "Routine not found");
    if (routine.userId !== userId) return status(403, "Forbidden");

    await db.routineItem.delete({ where: { id: params.itemId } });

    return { message: "Item deleted" };
  }, {
    params: t.Object({ id: t.String(), itemId: t.String() }),
    response: {
      200: t.Object({ message: t.String() }),
      401: t.String(),
      403: t.String(),
      404: t.String(),
    },
  });