import type { NextFunction, Request, Response } from "express";

import blackListModel from "../models/blacklist.model.js";
import jwt from 'jsonwebtoken'
import { env } from "../config/env.js";

export async function authUser(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.token

  if(!token) {
    return res.status(401).json({
      message: "Invalid token"
    })
  }

  const isTokenBlacklisted = await blackListModel.findOne({ token })

  if (isTokenBlacklisted) {
     return res.status(401).json({
      message: "Token Expired"
    })
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET)
    
    req.user = decoded

    next()
  } catch (error) {
    return res.status(401).json({
      message: "Invalid Token"
    })
  }
}