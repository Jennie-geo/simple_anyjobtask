/*
  Warnings:

  - You are about to drop the column `savingtimelength` on the `account` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `account` DROP COLUMN `savingtimelength`,
    ADD COLUMN `savingTimeLength` ENUM('THREE_MONTHS', 'SIX_MONTHS', 'ONE_YEAR') NOT NULL DEFAULT 'THREE_MONTHS';
