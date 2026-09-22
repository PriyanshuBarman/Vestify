-- AlterTable
ALTER TABLE `stock_orders` ADD COLUMN `sipId` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `stock_sips` (
    `id` VARCHAR(191) NOT NULL,
    `symbol` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `shortName` VARCHAR(191) NOT NULL,
    `frequency` ENUM('WEEKLY', 'MONTHLY') NOT NULL DEFAULT 'MONTHLY',
    `type` ENUM('AMOUNT', 'QUANTITY') NOT NULL DEFAULT 'QUANTITY',
    `sipDate` INTEGER NOT NULL,
    `nextInstallmentDate` DATE NOT NULL,
    `amount` DECIMAL(18, 2) NULL,
    `quantity` INTEGER NULL,
    `failedCount` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `portfolioId` VARCHAR(191) NULL,

    INDEX `stock_sips_userId_symbol_idx`(`userId`, `symbol`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pending_stock_sip_changes` (
    `id` VARCHAR(191) NOT NULL,
    `type` ENUM('AMOUNT', 'QUANTITY') NULL,
    `amount` DECIMAL(18, 2) NULL,
    `quantity` INTEGER NULL,
    `frequency` ENUM('WEEKLY', 'MONTHLY') NULL,
    `sipDate` INTEGER NULL,
    `nextInstallmentDate` DATE NULL,
    `applyDate` DATE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `sipId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `pending_stock_sip_changes_userId_sipId_key`(`userId`, `sipId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `stock_orders` ADD CONSTRAINT `stock_orders_sipId_fkey` FOREIGN KEY (`sipId`) REFERENCES `stock_sips`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `stock_sips` ADD CONSTRAINT `stock_sips_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `stock_sips` ADD CONSTRAINT `stock_sips_portfolioId_fkey` FOREIGN KEY (`portfolioId`) REFERENCES `stock_portfolios`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pending_stock_sip_changes` ADD CONSTRAINT `pending_stock_sip_changes_sipId_fkey` FOREIGN KEY (`sipId`) REFERENCES `stock_sips`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pending_stock_sip_changes` ADD CONSTRAINT `pending_stock_sip_changes_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
