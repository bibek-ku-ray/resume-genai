import { type Request, type Response } from "express";
import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

/**
 * @name registerUserController
 * @description Controller for user registration expect username, email, and password in req body
 * @access Public
 * @param req
 * @param res
 */
export async function registerUserController(req: Request, res: Response) {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const isUserAlreadyExists = await userModel.findOne({
      $or: [{ username }, { email }],
    });

    if (isUserAlreadyExists) {
      return res.status(409).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      username,
      email,
      password: hashedPassword,
    });

    // Create JWT token
    const token = jwt.sign(
      { id: user._id, username: user.username },
      env.JWT_SECRET,
      {
        expiresIn: "6h",
      },
    );

    res.cookie("token", token);

    // Send success response
    res.status(201).json({
      message: "User registered successfully",
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (error) {
    // Handle errors (e.g., user already exists)
    res.status(500).json({ error: "Internal server error" });
  }
}

/**
 * @name loginUserController
 * @description Controller for user login expect email and password in req body
 * @access Public
 * @param req
 * @param res
 */
export async function loginUserController(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and Password is required" });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = bcrypt.compare(password, user.password)

    if(!isPasswordValid) {
      return res.status(401).json({
        message: "Incorrect password"
      })
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      env.JWT_SECRET,
    );

    res.cookie("token", token);

    res.status(201).json({
      message: "User logged in successfully",
      user: { id: user?._id, username: user?.username, email: user?.email },
    });
  } catch (error) {}
}
