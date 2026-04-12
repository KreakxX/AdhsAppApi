/*
  Warnings:

  - You are about to drop the column `checked` on the `routineItem` table. All the data in the column will be lost.
  - You are about to drop the `sharedReminder` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sharedReminderItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `sharedReminder` DROP FOREIGN KEY `sharedReminder_groupId_fkey`;

-- DropForeignKey
ALTER TABLE `sharedReminderItem` DROP FOREIGN KEY `sharedReminderItem_reminderId_fkey`;

-- AlterTable
ALTER TABLE `routine` ADD COLUMN `groupId` VARCHAR(191) NULL,
    MODIFY `freeSpace` INTEGER NULL,
    MODIFY `userId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `routineItem` DROP COLUMN `checked`,
    ADD COLUMN `checkedAt` DATETIME(3) NULL,
    ADD COLUMN `checkedBy` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `sharedReminder`;

-- DropTable
DROP TABLE `sharedReminderItem`;

-- AddForeignKey
ALTER TABLE `routine` ADD CONSTRAINT `routine_groupId_fkey` FOREIGN KEY (`groupId`) REFERENCES `group`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
