import type { Request, Response, NextFunction } from "express";

export function canCreateUser() {
  return (req: Request, res: Response, next: NextFunction) => {
    const authUser = req.user;
    const { role: targetRole } = req.body;

    if (!authUser) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (!targetRole) {
      return res.status(400).json({ error: "Target role is required" });
    }

    if (!["student", "teacher", "admin"].includes(targetRole)) {
      return res.status(400).json({ error: "Invalid target role" });
    }

    switch (authUser.role) {
      case "student":
        return res.status(403).json({ error: "Students cannot create users" });

      case "teacher":
        if (targetRole !== "student") {
          return res
            .status(403)
            .json({ error: "Teachers can only create student users" });
        }
        break;

      case "admin":
        break;

      default:
        return res.status(403).json({ error: "Unauthorized role" });
    }

    next();
  };
}
