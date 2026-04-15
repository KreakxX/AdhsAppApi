import jwt from "@elysiajs/jwt";
import Elysia, { t } from "elysia";
import {db} from "../../db.ts"
import { userPlain } from "@/generated/prismabox/user.ts";
import { mailer } from "../mail.ts";
import { dragonFlyCache } from "../cache.ts";

export const authRoutes = new Elysia({ prefix: '/auth' }).use(dragonFlyCache).use(
  jwt({
    name: 'jwt',
    secret: process.env.JWT_SECRET! ,
  })
).post("/login", async({body,jwt,status})=>{
  const user = await db.user.findUnique({where: {email: body.email}})

  if(!user) return status(404,"User with username does not exists")
  if(!user.password) return status(404,"User with username does not exists")
  const isValid = await Bun.password.verify(body.password,user.password)
  if(!isValid) return status(404," Password and username not valid")
  return {
  message: "User Logged in",
  jwt: await jwt.sign({ userId: user.id, email: user.email}),
  status: true
};
}, {
  body: t.Object({
    email: t.String(),
    password: t.String()
  }),response: {
    200:t.Object({message: t.String(), jwt: t.String(), status: t.Boolean()}), 404: t.String()
  }
})
.post("register-code", async({body, store}) =>{
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    await store.cache.set(`email_verification:${body.email}`, code, 300)

    await mailer.sendMail({
    from: '"GeoAlert" <support@medapp.de>',
    to: body.email,
    subject: "Dein GeoAlert Bestätigungscode",
    html: `
      <div style="font-family: system-ui, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px;">
        <h2 style="color: #1A1917; font-size: 22px; margin-bottom: 8px;">Dein Code</h2>
        <p style="color: #6B6860; font-size: 15px; margin-bottom: 28px;">
          Gib diesen Code in der App ein. Er ist 10 Minuten gültig.
        </p>
        <div style="background: #EFF6FF; border: 1px solid #DBEAFE; border-radius: 16px;
          padding: 28px; text-align: center; margin-bottom: 24px;">
          <span style="font-size: 42px; font-weight: 700; letter-spacing: 12px; color: #2563EB;">
            ${code}
          </span>
        </div>
        <p style="color: #A09D97; font-size: 13px;">
          Falls du das nicht angefordert hast, ignoriere diese E-Mail.
        </p>
      </div>
    `,
  });

  return {status: true}

},{
  body: t.Object({
    email: t.String()
  }),response: {
    200: t.Object({status: t.Boolean()})
  }
})

.post("register", async({body,status,store})=>{

  const code = await store.cache.get(`email_verification:${body.email}`)

  if(code !== body.code){
      return status(404, { message: "Code is not correct", status: false })
  }
  const userExist = await db.user.findUnique({where: {email: body.email}})
  if(userExist) return status(404, { message: "User already exists", status: false })
  const hashedPassword = await Bun.password.hash(body.password);

  const user = await db.user.create({
    data: {
      email: body.email,
      password: hashedPassword,
      name: body.name
    }
  })
  await store.cache.del(`email_verification:${body.email}`)

  return {user}
},{
   body: t.Object({
    email: t.String(),
    password: t.String(),
    name: t.String(),
    code: t.String()
  }),response: {
  200: t.Object({ user: userPlain }),
  404: t.Object({ message: t.String(), status: t.Boolean() }),
}
}).get("/is/user/onboarded", async({query})=>{

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
}).put("/onboarding/status", async({body})=>{
   await db.user.update({where:{id: body.userId},data: { onboarding: body.onboarded}})
},{
  body: t.Object({onboarded: t.Boolean(), userId: t.String()})
})

.post("/send-code", async ({ body, status }) => {
  const user = await db.user.findUnique({ where: { email: body.email } });
  if (!user) return status(404, "User not found");

  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

  await db.user.update({
    where: { email: body.email },
    data: { twoFactorCode: code, twoFactorExpiresAt: expiresAt },
  });
 
  
  await mailer.sendMail({
    from: '"GeoAlert" <support@medapp.de>',
    to: body.email,
    subject: "Dein GeoAlert Bestätigungscode",
    html: `
      <div style="font-family: system-ui, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px;">
        <h2 style="color: #1A1917; font-size: 22px; margin-bottom: 8px;">Dein Code</h2>
        <p style="color: #6B6860; font-size: 15px; margin-bottom: 28px;">
          Gib diesen Code in der App ein. Er ist 10 Minuten gültig.
        </p>
        <div style="background: #EFF6FF; border: 1px solid #DBEAFE; border-radius: 16px;
          padding: 28px; text-align: center; margin-bottom: 24px;">
          <span style="font-size: 42px; font-weight: 700; letter-spacing: 12px; color: #2563EB;">
            ${code}
          </span>
        </div>
        <p style="color: #A09D97; font-size: 13px;">
          Falls du das nicht angefordert hast, ignoriere diese E-Mail.
        </p>
      </div>
    `,
  });
 

  return { sent: true };
}, {
  body: t.Object({ email: t.String() }),
  response: {
    200: t.Object({ sent: t.Boolean() }),
    404: t.String(),
  },
})
.post("/verify-code", async ({ body, jwt, status }) => {
  const user = await db.user.findUnique({ where: { email: body.email } });

  if (!user)                            return status(404, "User not found");
  if (!user.twoFactorCode)              return status(400, "Kein Code angefordert");
  if (user.twoFactorCode !== body.code) return status(400, "Ungültiger Code");
  if (!user.twoFactorExpiresAt || user.twoFactorExpiresAt < new Date()) {
    return status(400, "Code abgelaufen");
  }

  await db.user.update({
    where: { email: body.email },
    data: { twoFactorCode: null, twoFactorExpiresAt: null },
  });

  const token = await jwt.sign({ userId: user.id, email: user.email });
  return { jwt: token };
}, {
  body: t.Object({ email: t.String(), code: t.String() }),
  response: {
    200: t.Object({ jwt: t.String() }),
    400: t.String(),
    404: t.String(),
  },
})