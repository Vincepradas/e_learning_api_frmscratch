import type { Request, Response, NextFunction } from "express";

export function requireTeacherOrAdmin() {
  return (req: Request, res: Response, next: NextFunction) => {
    const authUser = req.user;

    if (!authUser) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (!["teacher", "admin"].includes(authUser.role)) {
      return res
        .status(403)
        .json({ error: "Only teachers or admins are allowed" });
    }

    next();
  };
}
