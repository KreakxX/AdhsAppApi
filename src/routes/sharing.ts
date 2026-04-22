import jwt from "@elysiajs/jwt";
import Elysia, { t } from "elysia";
import { db } from "../../db.ts";
import { dragonFlyCache } from "../cache.ts";
import { nanoid } from "nanoid";

// ─── Reuse your existing jwtGuard pattern ────────────────────────────────────
const jwtGuard = new Elysia({ name: "jwtGuard-shared" })
  .use(dragonFlyCache)
  .use(jwt({ name: "jwt", secret: process.env.JWT_SECRET! }))
  .derive({ as: "scoped" }, async ({ jwt, headers, status }) => {
    const auth = headers.authorization;
    if (!auth?.startsWith("Bearer ")) return status(401, "Unauthorized");
    const token = auth.split(" ")[1];
    const payload = await jwt.verify(token);
    if (!payload || !payload.userId) return status(401, "Invalid token");
    return { userId: payload.userId as string };
  });

// ─── Shared item type ─────────────────────────────────────────────────────────
const SharedItemSchema = t.Object({
  id:          t.String(),
  name:        t.String(),
  description: t.Nullable(t.Optional(t.String())),
  imageUrl:    t.Nullable(t.Optional(t.String())),
});

const SharedRoutineResponseSchema = t.Object({
  token:        t.String(),
  routineName:  t.String(),
  radius:       t.Number(),
  triggerHour:  t.Nullable(t.Optional(t.Number())),
  triggerMinute:t.Nullable(t.Optional(t.Number())),
  triggerOnExit:t.Boolean(),
  latitude:     t.Nullable(t.Optional(t.Number())),
  longitude:    t.Nullable(t.Optional(t.Number())),
  street:       t.Nullable(t.Optional(t.String())),
  streetNumber: t.Nullable(t.Optional(t.String())),
  freeSpace:    t.Nullable(t.Optional(t.Number())),
  createdBy:    t.Object({ name: t.String() }),
  expiresAt:    t.Nullable(t.Optional(t.String())),
  alreadyClaimed: t.Boolean(),
  items:        t.Array(SharedItemSchema),
});

export const sharedRoutineRoutes = new Elysia({ prefix: "/shared-routines" })
  .use(jwtGuard)

  .post(
    "/",
    async ({ userId, body, status }) => {
      const routine = await db.routine.findUnique({
        where: { id: body.routineId },
        include: { items: true },
      });

      if (!routine) return status(404, "Routine nicht gefunden");
      if (routine.userId !== userId) return status(403, "Keine Berechtigung");

      const expiresAt = body.expiryDays
        ? new Date(Date.now() + body.expiryDays * 24 * 60 * 60 * 1000)
        : null;

      const shared = await db.sharedRoutine.create({
        data: {
          token:          nanoid(10),
          routineId:      routine.id,
          routineName:    routine.name,
          radius:         routine.radius,
          triggerHour:    routine.triggerHour,
          triggerMinute:  routine.triggerMinute,
          triggerOnExit:  routine.triggerOnExit,
          latitude:       routine.latitude,
          longitude:      routine.longitude,
          street:         routine.street,
          streetNumber:   routine.streetNumber,
          freeSpace:      routine.freeSpace,
          createdByUserId: userId,
          expiresAt,
          items: {
            create: routine.items.map((item) => ({
              name:        item.name,
              description: item.description,
              imageUrl:    item.imageUrl,
            })),
          },
        },
      });

      return {
        token:   shared.token,
        deepLink: `remindspot://import/${shared.token}`,
        expiresAt: shared.expiresAt?.toISOString() ?? null,
      };
    },
    {
      body: t.Object({
        routineId:  t.String(),
        expiryDays: t.Optional(t.Number()), 
      }),
      response: {
        200: t.Object({
          token:     t.String(),
          deepLink:  t.String(),
          expiresAt: t.Nullable(t.String()),
        }),
        401: t.String(),
        403: t.String(),
        404: t.String(),
      },
    },
  )

  .get(
    "/:token",
    async ({ params, status }) => {
      const shared = await db.sharedRoutine.findUnique({
        where:   { token: params.token },
        include: { items: true, createdBy: { select: { name: true } } },
      });

      if (!shared) return status(404, "Link nicht gefunden");

      // Check expiry
      if (shared.expiresAt && shared.expiresAt < new Date()) {
        return status(410, "Dieser Link ist abgelaufen");
      }

      return {
        token:          shared.token,
        routineName:    shared.routineName,
        radius:         shared.radius,
        triggerHour:    shared.triggerHour,
        triggerMinute:  shared.triggerMinute,
        triggerOnExit:  shared.triggerOnExit,
        latitude:       shared.latitude,
        longitude:      shared.longitude,
        street:         shared.street,
        streetNumber:   shared.streetNumber,
        freeSpace:      shared.freeSpace,
        createdBy:      shared.createdBy,
        expiresAt:      shared.expiresAt?.toISOString() ?? null,
        alreadyClaimed: shared.claimedAt !== null,
        items:          shared.items,
      };
    },
    {
      params: t.Object({ token: t.String() }),
      response: {
        200: SharedRoutineResponseSchema,
        404: t.String(),
        410: t.String(), 
      },
    },
  )

  .post(
    "/:token/import",
    async ({ userId, params, status }) => {
      const shared = await db.sharedRoutine.findUnique({
        where:   { token: params.token },
        include: { items: true },
      });

      if (!shared) return status(404, "Link nicht gefunden");

      if (shared.expiresAt && shared.expiresAt < new Date()) {
        return status(410, "Dieser Link ist abgelaufen");
      }

      if (shared.createdByUserId === userId) {
        return status(400, "Du kannst deine eigene Routine nicht importieren");
      }

      const cloned = await db.routine.create({
        data: {
          name:          shared.routineName,
          radius:        shared.radius,
          triggerHour:   shared.triggerHour,
          triggerMinute: shared.triggerMinute,
          triggerOnExit: shared.triggerOnExit,
          latitude:      shared.latitude,
          longitude:     shared.longitude,
          street:        shared.street,
          streetNumber:  shared.streetNumber,
          freeSpace:     shared.freeSpace,
          userId,
          items: {
            create: shared.items.map((item) => ({
              name:        item.name,
              description: item.description,
              imageUrl:    item.imageUrl,
            })),
          },
        },
        include: { items: true },
      });

      await db.sharedRoutine.update({
        where: { token: params.token },
        data: {
          claimedAt:       new Date(),
          claimedByUserId: userId,
        },
      });

      return { routine: cloned };
    },
    {
      params: t.Object({ token: t.String() }),
      response: {
        200: t.Object({ routine: t.Any() }),
        400: t.String(),
        401: t.String(),
        404: t.String(),
        410: t.String(),
      },
    },
  );