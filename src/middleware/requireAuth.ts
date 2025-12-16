import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import prisma from "../config/database";
import type { Role, RoleId } from "../types/User";
import { RoleMap } from "../types/User";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

declare global {
  namespace Express {
    interface Request {
      user?: { id: string; role: Role; email: string; roleId?: RoleId };
    }
  }
}

export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ error: "Missing or invalid authorization header" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, email: true, role: true },
    });

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    // Map role string back to roleId if needed
    const roleId = Object.entries(RoleMap).find(
      ([, value]) => value === user.role
    )?.[0];

    req.user = {
      id: user.id.toString(),
      email: user.email,
      role: user.role,
      roleId: roleId ? Number(roleId) as RoleId : undefined,
    };

    next();
  } catch (error: any) {
    return res.status(401).json({ error: "Unauthorized: " + error.message });
  }
};
