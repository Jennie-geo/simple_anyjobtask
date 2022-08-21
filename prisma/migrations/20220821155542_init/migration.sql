/*
  Warnings:

  - You are about to drop the `invite` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[senderId]` on the table `invites` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[receiverId]` on the table `invites` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `invite` DROP FOREIGN KEY `invite_accountId_fkey`;

-- DropTable
DROP TABLE `invite`;

-- CreateTable
CREATE TABLE `accountMember` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `accountId` INTEGER NOT NULL,
    `relationshipWithBuddy` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `invites_senderId_key` ON `invites`(`senderId`);

-- CreateIndex
CREATE UNIQUE INDEX `invites_receiverId_key` ON `invites`(`receiverId`);

-- AddForeignKey
ALTER TABLE `accountMember` ADD CONSTRAINT `accountMember_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `account`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `invites` ADD CONSTRAINT `invites_senderId_fkey` FOREIGN KEY (`senderId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `invites` ADD CONSTRAINT `invites_receiverId_fkey` FOREIGN KEY (`receiverId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
