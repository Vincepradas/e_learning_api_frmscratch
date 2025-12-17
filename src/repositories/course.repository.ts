import prisma from "../config/database";
import { Course, Prisma } from "@prisma/client";

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

  findByCode(code: string): Promise<Course[]> {
    return prisma.course.findMany({
      where: { code },
      select: COURSE_SELECT,
    });
  }

  count(id?: string) {
    return prisma.course.count({
      where: { id },
    });
  }

  update(id: any, data: Prisma.CourseUpdateInput) {
    return prisma.course.update({
      where: { id },
      data,
      select: COURSE_SELECT,
    });
  }

  async isConflict(
    code: string,
    day: string,
    startTime: string,
    endTime: string
  ) {
    const conflict = await prisma.course.findFirst({
      where: {
        code,
        days: day,
        AND: [
          {
            startTime: { lt: endTime },
          },
          {
            endTime: { gt: startTime },
          },
        ],
      },
      select: COURSE_SELECT,
    });

    return !!conflict;
  }

    delete(id: string) {
    return prisma.course.delete({
      where: { id },
      select: COURSE_SELECT,
    });
  }
}
