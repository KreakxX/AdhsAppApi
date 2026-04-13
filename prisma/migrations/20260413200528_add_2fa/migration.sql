-- AlterTable
ALTER TABLE `user` ADD COLUMN `twoFactorCode` VARCHAR(191) NULL,
    ADD COLUMN `twoFactorExpiresAt` DATETIME(3) NULL;
