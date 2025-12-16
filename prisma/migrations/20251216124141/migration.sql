/*
  Warnings:

  - The values [LAB,LEC] on the enum `CourseType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `notifications` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `preferences` on the `User` table. All the data in the column will be lost.
  - Made the column `resetToken` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "CourseType_new" AS ENUM ('LABORATORY', 'LECTURE');
ALTER TABLE "Course" ALTER COLUMN "type" TYPE "CourseType_new" USING ("type"::text::"CourseType_new");
ALTER TYPE "CourseType" RENAME TO "CourseType_old";
ALTER TYPE "CourseType_new" RENAME TO "CourseType";
DROP TYPE "public"."CourseType_old";
COMMIT;

-- AlterTable
ALTER TABLE "Course" ALTER COLUMN "room" SET DEFAULT 'TBA';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "notifications",
DROP COLUMN "preferences",
ALTER COLUMN "resetToken" SET NOT NULL;
