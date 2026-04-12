-- CreateTable
CREATE TABLE `sharedReminderItem` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `imageUrl` VARCHAR(191) NULL,
    `checkedBy` VARCHAR(191) NULL,
    `checkedAt` DATETIME(3) NULL,
    `reminderId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `sharedReminderItem` ADD CONSTRAINT `sharedReminderItem_reminderId_fkey` FOREIGN KEY (`reminderId`) REFERENCES `sharedReminder`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
