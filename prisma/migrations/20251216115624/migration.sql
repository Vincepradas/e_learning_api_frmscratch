/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `Course` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `block` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `code` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `days` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endTime` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maxStudents` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `schoolYear` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `semester` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `units` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CourseType" AS ENUM ('LAB', 'LEC');

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "block" TEXT NOT NULL,
ADD COLUMN     "code" TEXT NOT NULL,
ADD COLUMN     "days" TEXT NOT NULL,
ADD COLUMN     "endTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "maxStudents" INTEGER NOT NULL,
ADD COLUMN     "room" TEXT,
ADD COLUMN     "schoolYear" TEXT NOT NULL,
ADD COLUMN     "semester" INTEGER NOT NULL,
ADD COLUMN     "startTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "type" "CourseType" NOT NULL,
ADD COLUMN     "units" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Course_code_key" ON "Course"("code");

-- CreateIndex
CREATE INDEX "Course_teacherId_idx" ON "Course"("teacherId");

-- CreateIndex
CREATE INDEX "Course_semester_schoolYear_idx" ON "Course"("semester", "schoolYear");
