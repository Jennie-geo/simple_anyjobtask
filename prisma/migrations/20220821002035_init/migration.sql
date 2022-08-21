/*
  Warnings:

  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AccountMember` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Invite` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_AccountToAccountMember` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Invite` DROP FOREIGN KEY `Invite_accountMemberId_fkey`;

-- DropForeignKey
ALTER TABLE `Invite` DROP FOREIGN KEY `Invite_userId_fkey`;

-- DropForeignKey
ALTER TABLE `_AccountToAccountMember` DROP FOREIGN KEY `_AccountToAccountMember_A_fkey`;

-- DropForeignKey
ALTER TABLE `_AccountToAccountMember` DROP FOREIGN KEY `_AccountToAccountMember_B_fkey`;

-- DropTable
DROP TABLE `Account`;

-- DropTable
DROP TABLE `AccountMember`;

-- DropTable
DROP TABLE `Invite`;

-- DropTable
DROP TABLE `_AccountToAccountMember`;

-- CreateTable
CREATE TABLE `account` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `anyTarget` ENUM('YES', 'NO') NOT NULL DEFAULT 'YES',
    `methodofsaving` ENUM('AUTOMATIC', 'MANUAL') NOT NULL DEFAULT 'MANUAL',
    `savingfrequency` ENUM('DAILY', 'WEEKLY', 'MONTHLY') NOT NULL DEFAULT 'DAILY',
    `whentoStart` DATETIME(3) NOT NULL,
    `howmuchtosave` INTEGER NOT NULL,
    `datetostartsaving` DATETIME(3) NOT NULL,
    `savingTimeLength` ENUM('THREE_MONTHS', 'SIX_MONTHS', 'ONE_YEAR') NOT NULL DEFAULT 'THREE_MONTHS',
    `creatorId` INTEGER NOT NULL,
    `startdate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `accountMemeber` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `accountId` INTEGER NOT NULL,
    `relationshipWithBuddy` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `account` ADD CONSTRAINT `account_creatorId_fkey` FOREIGN KEY (`creatorId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `accountMemeber` ADD CONSTRAINT `accountMemeber_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `account`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
