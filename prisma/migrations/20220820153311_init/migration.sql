/*
  Warnings:

  - You are about to drop the column `isAdmin` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `Groupsavings` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Groupsavings` DROP FOREIGN KEY `Groupsavings_UserId_fkey`;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `isAdmin`;

-- DropTable
DROP TABLE `Groupsavings`;

-- CreateTable
CREATE TABLE `Account` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `anyTarget` ENUM('YES', 'NO') NOT NULL DEFAULT 'YES',
    `methodofsaving` ENUM('AUTOMATIC', 'MANUAL') NOT NULL DEFAULT 'MANUAL',
    `savingfrequency` ENUM('DAILY', 'WEEKLY', 'MONTHLY') NOT NULL DEFAULT 'DAILY',
    `whentoStart` DATETIME(3) NOT NULL,
    `howmuchtosave` INTEGER NOT NULL,
    `datetostartsaving` DATETIME(3) NOT NULL,
    `savingTimeLength` ENUM('THREE_MONTHS', 'SIX_MONTHS', 'ONE_YEAR') NOT NULL DEFAULT 'THREE_MONTHS',
    `startdate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NOT NULL,
    `relationshipWithBuddy` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Invite` (
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `roles` ENUM('ISADMIN', 'USER') NOT NULL,
    `userId` INTEGER NOT NULL,
    `accountId` INTEGER NOT NULL,

    PRIMARY KEY (`userId`, `accountId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Invite` ADD CONSTRAINT `Invite_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Invite` ADD CONSTRAINT `Invite_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `Account`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
