import jwt from "@elysiajs/jwt";
import Elysia, { t } from "elysia";
import {db} from "../../db.ts"
import { userPlain } from "@/generated/prismabox/user.ts";

export const authRoutes = new Elysia({ prefix: '/auth' }).use(
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
}).post("register", async({body,status})=>{
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
  return {user}
},{
   body: t.Object({
    email: t.String(),
    password: t.String(),
    name: t.String()
  }),response: {
  200: t.Object({ user: userPlain }),
  404: t.Object({ message: t.String(), status: t.Boolean() }),
}
})
