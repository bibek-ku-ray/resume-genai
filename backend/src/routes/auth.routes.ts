import { Router } from "express";
import {
  getMeController,
  loginUserController,
  logoutUserController,
  registerUserController,
} from "../controllers/auth.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";

const authRouter: Router = Router();

/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access Public
 */
authRouter.post("/register", registerUserController);

/**
 * @route POST /api/auth/login
 * @description Login a user
 * @access Public
 */
authRouter.post("/login", loginUserController);

/**
 * @route POST /api/auth/logout
 * @description Logout a user
 * @access Public
 */
authRouter.post("/logout", logoutUserController);

/**
 * @route GET /api/auth/me
 * @description Get current logged in user
 * @access Private
 */

authRouter.get("/me", authUser, getMeController)
export default authRouter;
