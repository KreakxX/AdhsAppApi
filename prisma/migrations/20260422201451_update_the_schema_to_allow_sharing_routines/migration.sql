-- CreateTable
CREATE TABLE `sharedRoutine` (
    `id` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `routineId` VARCHAR(191) NOT NULL,
    `routineName` VARCHAR(191) NOT NULL,
    `radius` INTEGER NOT NULL,
    `triggerHour` INTEGER NULL,
    `triggerMinute` INTEGER NULL,
    `triggerOnExit` BOOLEAN NOT NULL DEFAULT false,
    `latitude` DOUBLE NULL,
    `longitude` DOUBLE NULL,
    `street` VARCHAR(191) NULL,
    `streetNumber` VARCHAR(191) NULL,
    `freeSpace` INTEGER NULL,
    `createdByUserId` VARCHAR(191) NOT NULL,
    `claimedAt` DATETIME(3) NULL,
    `claimedByUserId` VARCHAR(191) NULL,
    `expiresAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `sharedRoutine_token_key`(`token`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sharedRoutineItem` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `imageUrl` VARCHAR(191) NULL,
    `sharedRoutineId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `sharedRoutine` ADD CONSTRAINT `sharedRoutine_createdByUserId_fkey` FOREIGN KEY (`createdByUserId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sharedRoutine` ADD CONSTRAINT `sharedRoutine_claimedByUserId_fkey` FOREIGN KEY (`claimedByUserId`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sharedRoutineItem` ADD CONSTRAINT `sharedRoutineItem_sharedRoutineId_fkey` FOREIGN KEY (`sharedRoutineId`) REFERENCES `sharedRoutine`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
