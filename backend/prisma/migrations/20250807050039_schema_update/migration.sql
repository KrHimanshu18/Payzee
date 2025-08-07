/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `AccountDetails` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `AccountDetails` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AccountDetails" DROP CONSTRAINT "AccountDetails_id_fkey";

-- AlterTable
ALTER TABLE "AccountDetails" ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "AccountDetails_userId_key" ON "AccountDetails"("userId");

-- AddForeignKey
ALTER TABLE "AccountDetails" ADD CONSTRAINT "AccountDetails_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
