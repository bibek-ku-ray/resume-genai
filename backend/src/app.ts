import express from "express";
import "dotenv/config";

import { type Response, type Request, type Express } from "express";

import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";

const app: Express = express();

app.use(express.json());
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use("/api/auth", authRouter)

export default app;
