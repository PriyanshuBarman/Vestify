-- AlterTable
ALTER TABLE `mf_sips` ADD COLUMN `nextStepUpDate` DATE NULL,
    ADD COLUMN `stepUpAmount` DECIMAL(18, 2) NULL,
    ADD COLUMN `stepUpIntervalInMonths` INTEGER UNSIGNED NULL,
    ADD COLUMN `stepUpPercentage` DECIMAL(18, 2) NULL;
