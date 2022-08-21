/*
  Warnings:

  - You are about to drop the column `relationshipWithBuddy` on the `Account` table. All the data in the column will be lost.
  - The primary key for the `Invite` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `accountId` on the `Invite` table. All the data in the column will be lost.
  - Added the required column `accountMemberId` to the `Invite` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Invite` DROP FOREIGN KEY `Invite_accountId_fkey`;

-- AlterTable
ALTER TABLE `Account` DROP COLUMN `relationshipWithBuddy`;

-- AlterTable
ALTER TABLE `Invite` DROP PRIMARY KEY,
    DROP COLUMN `accountId`,
    ADD COLUMN `accountMemberId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`userId`, `accountMemberId`);

-- CreateTable
CREATE TABLE `AccountMember` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `relationshipWithBuddy` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_AccountToAccountMember` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_AccountToAccountMember_AB_unique`(`A`, `B`),
    INDEX `_AccountToAccountMember_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Invite` ADD CONSTRAINT `Invite_accountMemberId_fkey` FOREIGN KEY (`accountMemberId`) REFERENCES `AccountMember`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AccountToAccountMember` ADD CONSTRAINT `_AccountToAccountMember_A_fkey` FOREIGN KEY (`A`) REFERENCES `Account`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AccountToAccountMember` ADD CONSTRAINT `_AccountToAccountMember_B_fkey` FOREIGN KEY (`B`) REFERENCES `AccountMember`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
