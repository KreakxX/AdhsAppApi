import jwt from "@elysiajs/jwt";
import Elysia, { t } from "elysia";
import {db} from "../../db.ts"
import { userPlain } from "@/generated/prismabox/user.ts";
import { mailer } from "../mail.ts";
import { dragonFlyCache } from "../cache.ts";
import { OAuth2Client } from "google-auth-library";
import { forgetStat, forgetStatPlain } from "@/generated/prismabox/forgetStat.ts";

const googleClient = new OAuth2Client();


const WEB_CLIENT_ID = process.env.GOOGLE_WEB_CLIENT_ID!;


export const authRoutes = new Elysia({ prefix: '/auth' }).use(dragonFlyCache).use(
  jwt({
    name: 'jwt',
    secret: process.env.JWT_SECRET! ,
  })
)
.post("/auth/google", async({body, jwt, status} )=>{
  const { idToken } = body;

  let payload;

   try {
        const ticket = await googleClient.verifyIdToken({
          idToken,
          audience: WEB_CLIENT_ID,
        });
        payload = ticket.getPayload();
      } catch {
        return status(401, { error: "Invalid Google token" });
      }

      if (!payload?.sub || !payload.email) {
        return status(401, { error: "Token missing required claims" });
      }

       const user = await db.user.upsert({
        where: { googleSub: payload.sub },
        update: {
          email: payload.email,
          name: payload.name ?? null,
          avatarUrl: payload.picture ?? null,
        },
        create: {
          googleSub: payload.sub,
          email: payload.email,
          name: payload.name ?? null,
          avatarUrl: payload.picture ?? null,
        },
      });

      const token = await jwt.sign({ userId: user.id });

      return {
        token,
       
      };
    


},{
  body: t.Object({
    idToken: t.String()
  }),response: {
        200: t.Object({
          token: t.String(),
         
        }),
        401: t.Object({ error: t.String() }),
      },
})
.get("/is/user/onboarded", async({query})=>{

  const user = await db.user.findUnique({where: {id: query.userId}})
  if(!user || !user.onboarding){
    return {onboarded: false}
  }
  return {onboarded: true}

},{query: t.Object({
  userId: t.String()
}),response: {
  200: t.Object({onboarded: t.Boolean()})
}})
.get("/is/jwt/valid", async({jwt, headers,status})=>{
   const auth = headers.authorization;

  if(!auth || !auth.startsWith("Bearer ")) return status(404, "No Authorization Header found")

  const token = auth.split(" ")[1];
  const payload = await jwt.verify(token);

  if(!payload) return status(404, "No Payload")

  return {
    authenticated: true,
  }
},{
  response:{
    200: t.Object({authenticated:t.Boolean()}),
    404: t.String()
  }
}).put("/onboarding/status", async({body, jwt, headers, status})=>{
  const auth = headers.authorization;
  if (!auth?.startsWith("Bearer ")) return status(401, "Unauthorized");
  const token = auth.split(" ")[1];
  const payload = await jwt.verify(token);
  if (!payload || !payload.userId) return status(401, "Invalid token");
  await db.user.update({where:{id: payload.userId as string}, data: { onboarding: body.onboarded}})
  return { ok: true }
},{
  body: t.Object({onboarded: t.Boolean()}),
  response: {
    200: t.Object({ ok: t.Boolean() }),
    401: t.String(),
  }
})
.delete("/account", async({jwt, headers, status, store})=>{
  const auth = headers.authorization;
  if (!auth?.startsWith("Bearer ")) return status(401, "Unauthorized");
  const token = auth.split(" ")[1];
  const payload = await jwt.verify(token);
  if (!payload || !payload.userId) return status(401, "Invalid token");

  const userId = payload.userId as string;
  const user = await db.user.findUnique({where: {id: userId}})
  if (!user) return status(404, "User not found");

  const groupIds = (await db.groupMember.findMany({
    where: { userId },
    select: { groupId: true }
  })).map((member) => member.groupId)

  // co-members see the leaving user in their cached group lists
  const coMemberIds = (await db.groupMember.findMany({
    where: { groupId: { in: groupIds }, userId: { not: userId } },
    select: { userId: true }
  })).map((member) => member.userId)

  // routines, groupMemberships and created sharedRoutines cascade with the user,
  // claimed sharedRoutines keep existing with claimedByUserId set to null
  await db.user.delete({where: {id: userId}})

  // groups the user was the last member of would stay behind as orphans
  if (groupIds.length > 0) {
    await db.group.deleteMany({
      where: { id: { in: groupIds }, members: { none: {} } }
    })
  }

  await store.cache.del(`routines:${userId}`)
  await store.cache.del(`groups:${userId}`)
  for (const coMemberId of new Set(coMemberIds)) {
    await store.cache.del(`groups:${coMemberId}`)
  }

  return { deleted: true }
},{
  response: {
    200: t.Object({ deleted: t.Boolean() }),
    401: t.String(),
    404: t.String(),
  }
}).post("/create/log", async({body, jwt, headers ,status})=>{
  const auth = headers.authorization;
  if (!auth?.startsWith("Bearer ")) return status(401, "Unauthorized");
  const token = auth.split(" ")[1];
  const payload = await jwt.verify(token);
  if (!payload || !payload.userId) return status(401, "Invalid token");
    const userId = payload.userId as string;

  await db.forgetStat.createMany({
    data: body.map((item) => ({
      userId,
      ...item,
    })),  skipDuplicates: true,

    });

},{
  body: t.Array(t.Object({
  at: t.String(),
  routineId: t.String(),
  routineName: t.String(),
  itemId: t.Optional(t.Nullable(t.String())),
  itemName: t.String(),
  forgotten: t.Boolean(),
  weekday: t.Number(),
  minuteOfDay: t.Number(),
  })),
  response: {
    401: t.String()
  }
}).get("/read/log", async({jwt,headers,status})=>{

   const auth = headers.authorization;
  if (!auth?.startsWith("Bearer ")) return status(401, "Unauthorized");
  const token = auth.split(" ")[1];
  const payload = await jwt.verify(token);
  if (!payload || !payload.userId) return status(401, "Invalid token");
  const userId = payload.userId as string;

  return await db.forgetStat.findMany({where:{userId: userId},orderBy: {at: "desc"}})

},{
  response: {
    200: t.Array(forgetStatPlain),
    401: t.String()
  }
})

