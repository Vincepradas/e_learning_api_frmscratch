import { Request, Response } from "express";
import { AuthService } from "../services/auth.services";

export class AuthController {
  private service = new AuthService();

  signup = async (req: Request, res: Response) => {
    try {
      const result = await this.service.signup(req.body);
      res.status(201).json(result);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  };

  signin = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const result = await this.service.signin(email, password);
      res.json(result);
    } catch (e: any) {
      res.status(401).json({ error: e.message });
    }
  };

  forgotPassword = async (req: Request, res: Response) => {
    await this.service.forgotPassword(req.body.email);
    res.json({ message: "If email exists, reset link sent" });
  };

  resetPassword = async (req: Request, res: Response) => {
    try {
      const { token, password } = req.body;
      await this.service.resetPassword(token, password);
      res.json({ message: "Password reset successful" });
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  };
}
