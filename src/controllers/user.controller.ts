import { Request, Response } from "express";
import { UserService } from "../services/user.services";
import { validateRole } from "../utils/role.util";

export class UserController {
  private service = new UserService();

  create = async (req: Request, res: Response) => {
    try {
      const user = await this.service.create(req.body);
      res.status(201).json({ message: "User created", user });
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  };

  createStudent = (req: Request, res: Response) => {
    req.body.role = "student";
    return this.create(req, res);
  };

  createInstructor = (req: Request, res: Response) => {
    req.body.role = "teacher";
    return this.create(req, res);
  };

  getAll = async (req: Request, res: Response) => {
    const pageSize = Math.min(Number(req.query.pageSize) || 10, 100);
    const pageIndex = Math.max(Number(req.query.pageIndex) || 0, 0);
    const role = validateRole(String(req.query.role))
      ? (req.query.role as any)
      : undefined;

    const result = await this.service.getAll(pageIndex, pageSize, role);

    res.json({
      pageIndex,
      pageSize,
      totalUsers: result.total,
      totalPages: Math.ceil(result.total / pageSize),
      users: result.users,
    });
  };

  getById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    try {
      const user = await this.service.getById(id);
      res.json(user);
    } catch (e: any) {
      res.status(404).json({ error: e.message });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const user = await this.service.update(Number(req.params.id), req.body);
      res.json({ message: "User updated", user });
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  };

  delete = async (req: Request, res: Response) => {
    await this.service.delete(Number(req.params.id));
    res.json({ message: "User deleted" });
  };
}
