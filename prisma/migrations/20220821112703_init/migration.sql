/*
  Warnings:

  - You are about to drop the column `anytarget` on the `account` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `account` DROP COLUMN `anytarget`,
    ADD COLUMN `anyTarget` ENUM('YES', 'NO') NOT NULL DEFAULT 'NO';
