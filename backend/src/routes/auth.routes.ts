import { Router } from "express";
import { registerUserController } from "../controllers/auth.controller.js";

const authRouter: Router = Router()

/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access Public
 */
authRouter.post("/register", registerUserController)

export default authRouter