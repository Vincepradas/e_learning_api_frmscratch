import prisma from "../config/database";
import { Role, Prisma } from "@prisma/client";

export const COURSE_SELECT = {
  id: true,
  code: true,
  title: true,
  description: true,

  startTime: true,
  endTime: true,
  days: true,
  room: true,

  type: true,
  units: true,
  block: true,
  semester: true,
  schoolYear: true,

  maxStudents: true,
  isActive: true,

  teacherId: true,
  teacher: {
    select: {
      id: true,
      name: true,
      email: true,
    },
  },

  enrollments: {
    select: {
      id: true,
      userId: true,
    },
  },
  quizzes: {
    select: {
      id: true,
      title: true,
    },
  },

  createdAt: true,
  updatedAt: true,
} satisfies Prisma.CourseSelect;

export class CourseRepository {
  create(data: Prisma.CourseCreateInput) {
    return prisma.course.create({
      data,
      select: COURSE_SELECT,
    });
  }

  findAll(pageIndex: number, pageSize: number) {
    return prisma.course.findMany({
      skip: pageIndex * pageSize,
      take: pageSize,
      select: COURSE_SELECT,
    });
  }
}
