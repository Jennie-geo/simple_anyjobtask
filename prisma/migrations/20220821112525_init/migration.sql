/*
  Warnings:

  - Made the column `numberofbuddy` on table `account` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `account` MODIFY `numberofbuddy` INTEGER NOT NULL;
