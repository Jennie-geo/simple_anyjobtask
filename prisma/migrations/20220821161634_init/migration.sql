/*
  Warnings:

  - Added the required column `accountId` to the `invites` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `invites` ADD COLUMN `accountId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `invites` ADD CONSTRAINT `invites_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `account`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
