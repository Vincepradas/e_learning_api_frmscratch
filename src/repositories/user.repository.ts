import prisma from "../config/database";
import { Role, Prisma } from "@prisma/client";

const USER_SELECT = {
  id: true,
  name: true,
  email: true,
  phoneNumber: true,
  address: true,
  status: true,
  role: true,
  profileImage: true,
  bio: true,
  dateOfBirth: true,
  gender: true,
  isVerified: true,
  lastLogin: true,
  preferences: true,
  notifications: true,
  createdAt: true,
  updatedAt: true,
};

export class UserRepository {
  // -------- READ --------

  findAll(pageIndex: number, pageSize: number, role?: string) {
    return prisma.user.findMany({
      skip: pageIndex * pageSize,
      take: pageSize,
      where: role ? { role: role as Role } : undefined,
      select: USER_SELECT,
    });
  }

  count(role?: string) {
    return prisma.user.count({
      where: role ? { role: role as Role } : undefined,
    });
  }

  findById(id: number) {
    return prisma.user.findUnique({
      where: { id },
      select: USER_SELECT,
    });
  }

  findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  findByPhoneNumber(phoneNumber: string) {
    return prisma.user.findUnique({
      where: { phoneNumber },
    });
  }

  existsById(id: number) {
    return prisma.user
      .count({
        where: { id },
      })
      .then((count) => count > 0);
  }

  // -------- WRITE --------

  create(data: Prisma.UserCreateInput) {
    return prisma.user.create({
      data,
      select: USER_SELECT,
    });
  }

  update(id: number, data: Prisma.UserUpdateInput) {
    return prisma.user.update({
      where: { id },
      data,
      select: USER_SELECT,
    });
  }

  delete(id: number) {
    return prisma.user.delete({
      where: { id },
      select: USER_SELECT,
    });
  }
}
