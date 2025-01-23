/*
  Warnings:

  - You are about to drop the column `user_id` on the `invites` table. All the data in the column will be lost.
  - Added the required column `author_id` to the `invites` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "invites" DROP CONSTRAINT "invites_user_id_fkey";

-- AlterTable
ALTER TABLE "invites" DROP COLUMN "user_id",
ADD COLUMN     "author_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "invites" ADD CONSTRAINT "invites_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
