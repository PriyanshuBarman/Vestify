-- AlterTable
ALTER TABLE `mf_sips` ADD COLUMN `portfolioId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `mf_sips` ADD CONSTRAINT `mf_sips_portfolioId_fkey` FOREIGN KEY (`portfolioId`) REFERENCES `mf_portfolios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
