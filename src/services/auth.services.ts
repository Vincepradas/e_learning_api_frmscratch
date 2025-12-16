import prisma from "../config/database";
import { hashPassword, comparePassword } from "../utils/password.util";
import { signToken } from "../utils/jwt.util";
import crypto from "crypto";

export class AuthService {
  async signup(data: {
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
    role?: "student" | "teacher" | "admin";
  }) {
    const exists = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (exists) {
      throw new Error("Email already registered");
    }

    const password = await hashPassword(data.password);

    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber,
        password,
        role: data.role ?? "student",
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    const token = signToken({ userId: user.id });

    return { user, token };
  }

  async signin(email: string, password: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !user.password) {
      throw new Error("Invalid credentials");
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      throw new Error("Invalid credentials");
    }

    const token = signToken({ userId: user.id });

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    };
  }

  async forgotPassword(email: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return;

    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashed = crypto.createHash("sha256").update(resetToken).digest("hex");

    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetToken: hashed,
        resetTokenExpiry: new Date(Date.now() + 15 * 60 * 1000),
      },
    });

    return resetToken;
  }

  async resetPassword(token: string, newPassword: string) {
    const hashed = crypto.createHash("sha256").update(token).digest("hex");

    const user = await prisma.user.findFirst({
      where: {
        resetToken: hashed,
        resetTokenExpiry: { gt: new Date() },
      },
    });

    if (!user) {
      throw new Error("Invalid or expired token");
    }

    const password = await hashPassword(newPassword);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password,
        resetToken: null,
        resetTokenExpiry: null,
      },
    });
  }
}
