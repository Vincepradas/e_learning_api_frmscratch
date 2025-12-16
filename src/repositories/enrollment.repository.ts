import prisma from "../config/database";
import { Role, Prisma } from "@prisma/client";

const ENROLLMENT_SELECT = {
  id: true,
  userId: true,
  courseId: true,
  user: true,
  course: true,
  enrolledAt: true,
};

export class EnrollmentRepository {
  findAll(pageIndex: number, pageSize: number) {
    return prisma.enrollment.findMany({
      skip: pageIndex * pageSize,
      take: pageSize,
      select: ENROLLMENT_SELECT,
    });
  }
  
  findById(id: number) {
    return prisma.enrollment.findUnique({
      where: { id },
      select: ENROLLMENT_SELECT,
    });

    //   create();
    //   update();
    //   delete();
  }
}
