-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `verifyAccount` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `account` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NULL,
    `numberofbuddy` INTEGER NULL,
    `anyTarget` ENUM('YES', 'NO') NOT NULL DEFAULT 'NO',
    `methodofsaving` ENUM('AUTOMATIC', 'MANUAL') NOT NULL DEFAULT 'MANUAL',
    `savingfrequency` ENUM('DAILY', 'WEEKLY', 'MONTHLY') NOT NULL DEFAULT 'DAILY',
    `whentoStart` VARCHAR(191) NULL,
    `howmuchtosave` INTEGER NULL,
    `datetostartsaving` VARCHAR(191) NULL,
    `savingTimeLength` ENUM('THREE_MONTHS', 'SIX_MONTHS', 'ONE_YEAR') NOT NULL DEFAULT 'THREE_MONTHS',
    `creatorId` INTEGER NOT NULL,
    `startdate` VARCHAR(191) NULL,
    `endDate` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `accountMember` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `accountId` INTEGER NOT NULL,
    `relationshipWithBuddy` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `invites` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `senderId` INTEGER NOT NULL,
    `receiverId` INTEGER NOT NULL,
    `methodofsaving` ENUM('AUTOMATIC', 'MANUAL') NOT NULL DEFAULT 'MANUAL',
    `savingfrequency` ENUM('DAILY', 'WEEKLY', 'MONTHLY') NOT NULL DEFAULT 'DAILY',
    `whentoStart` VARCHAR(191) NULL,
    `howmuchtosave` INTEGER NULL,
    `savingTimeLength` ENUM('THREE_MONTHS', 'SIX_MONTHS', 'ONE_YEAR') NOT NULL DEFAULT 'THREE_MONTHS',
    `status` ENUM('ACCEPTED', 'Rejected') NOT NULL DEFAULT 'Rejected',
    `isPending` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `invites_senderId_key`(`senderId`),
    UNIQUE INDEX `invites_receiverId_key`(`receiverId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `account` ADD CONSTRAINT `account_creatorId_fkey` FOREIGN KEY (`creatorId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `accountMember` ADD CONSTRAINT `accountMember_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `account`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `invites` ADD CONSTRAINT `invites_senderId_fkey` FOREIGN KEY (`senderId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `invites` ADD CONSTRAINT `invites_receiverId_fkey` FOREIGN KEY (`receiverId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
