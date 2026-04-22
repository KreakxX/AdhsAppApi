/*
  Warnings:

  - Added the required column `muted` to the `groupMember` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `groupMember` ADD COLUMN `muted` BOOLEAN NOT NULL;
