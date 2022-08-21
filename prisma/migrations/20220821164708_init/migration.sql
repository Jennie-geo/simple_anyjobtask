/*
  Warnings:

  - You are about to drop the column `whentoStart` on the `account` table. All the data in the column will be lost.
  - You are about to drop the column `whentoStart` on the `invites` table. All the data in the column will be lost.
  - Made the column `howmuchtosave` on table `account` required. This step will fail if there are existing NULL values in that column.
  - Made the column `startdate` on table `account` required. This step will fail if there are existing NULL values in that column.
  - Made the column `endDate` on table `account` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `startdate` to the `invites` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `account` DROP COLUMN `whentoStart`,
    MODIFY `howmuchtosave` INTEGER NOT NULL,
    MODIFY `startdate` VARCHAR(191) NOT NULL,
    MODIFY `endDate` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `invites` DROP COLUMN `whentoStart`,
    ADD COLUMN `startdate` VARCHAR(191) NOT NULL;
