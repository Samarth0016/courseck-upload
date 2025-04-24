/*
  Warnings:

  - You are about to drop the column `courceId` on the `Attachment` table. All the data in the column will be lost.
  - Added the required column `courseId` to the `Attachment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Attachment" DROP CONSTRAINT "Attachment_courceId_fkey";

-- DropIndex
DROP INDEX "Attachment_courceId_idx";

-- AlterTable
ALTER TABLE "Attachment" DROP COLUMN "courceId",
ADD COLUMN     "courseId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Attachment_courseId_idx" ON "Attachment"("courseId");

-- AddForeignKey
ALTER TABLE "Attachment" ADD CONSTRAINT "Attachment_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
