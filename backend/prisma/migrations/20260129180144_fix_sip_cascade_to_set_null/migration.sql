-- DropForeignKey
ALTER TABLE `mf_sips` DROP FOREIGN KEY `mf_sips_folio_fkey`;

-- DropIndex
DROP INDEX `mf_sips_folio_fkey` ON `mf_sips`;

-- AddForeignKey
ALTER TABLE `mf_sips` ADD CONSTRAINT `mf_sips_folio_fkey` FOREIGN KEY (`folio`) REFERENCES `mf_portfolios`(`folio`) ON DELETE SET NULL ON UPDATE CASCADE;
