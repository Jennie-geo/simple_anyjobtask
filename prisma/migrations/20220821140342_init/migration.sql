/*
  Warnings:

  - Added the required column `relationshipWithBuddy` to the `invites` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `invites` ADD COLUMN `relationshipWithBuddy` VARCHAR(191) NOT NULL;
