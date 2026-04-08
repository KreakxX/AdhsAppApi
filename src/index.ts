import Elysia, { t } from "elysia";
import { node } from "@elysiajs/node";
import { openapi, fromTypes } from "@elysiajs/openapi";
import { cors } from "@elysiajs/cors";
import path from "node:path";

import jwt from "@elysiajs/jwt";
import { authRoutes } from "./routes/auth";

export const app = new Elysia({ adapter: node() })
  .use(cors())
    .use(jwt({
    name: 'jwt',
    secret: process.env.JWT_SECRET! , 
  }))
    .use(
    openapi({
      references: fromTypes("src/index.ts"),
      documentation: { openapi: "3.1.0" }
    })
  )

 .use(authRoutes).listen(8060)

