/*
  Warnings:

  - You are about to drop the column `orderType` on the `mf_orders` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[stockOrderId]` on the table `transactions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `type` to the `mf_orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `mf_orders` DROP COLUMN `orderType`,
    ADD COLUMN `type` ENUM('ONE_TIME', 'REDEEM', 'SIP_INSTALLMENT', 'NEW_SIP') NOT NULL;

-- AlterTable
ALTER TABLE `transactions` ADD COLUMN `stockOrderId` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `stock_orders` (
    `id` VARCHAR(191) NOT NULL,
    `symbol` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `shortName` VARCHAR(191) NOT NULL,
    `type` ENUM('REGULAR', 'SL', 'GTT') NOT NULL,
    `productType` ENUM('DELIVERY') NOT NULL DEFAULT 'DELIVERY',
    `action` ENUM('BUY', 'SELL') NOT NULL,
    `status` ENUM('OPEN', 'SUCCESSFUL', 'UNSUCCESSFUL', 'CANCELLED') NOT NULL DEFAULT 'OPEN',
    `amount` DECIMAL(18, 2) NULL,
    `quantity` INTEGER NULL,
    `price` DECIMAL(10, 4) NULL,
    `triggerPrice` DECIMAL(10, 4) NULL,
    `limitPrice` DECIMAL(10, 4) NULL,
    `validity` ENUM('DAY_END', 'YEAR') NOT NULL DEFAULT 'DAY_END',
    `expiresAt` DATE NULL,
    `gttType` ENUM('TARGET', 'STOP_LOSS') NULL,
    `executedAt` DATETIME(3) NULL,
    `failureReason` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    INDEX `stock_orders_status_idx`(`status`),
    INDEX `stock_orders_expiresAt_idx`(`expiresAt`),
    INDEX `stock_orders_userId_symbol_idx`(`userId`, `symbol`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `stock_portfolios` (
    `id` VARCHAR(191) NOT NULL,
    `symbol` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `shortName` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `invested` DECIMAL(18, 2) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    INDEX `stock_portfolios_userId_idx`(`userId`),
    UNIQUE INDEX `stock_portfolios_userId_symbol_key`(`userId`, `symbol`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `stock_holdings` (
    `id` VARCHAR(191) NOT NULL,
    `symbol` VARCHAR(191) NOT NULL,
    `price` DECIMAL(10, 4) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `amount` DECIMAL(18, 2) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `portfolioId` VARCHAR(191) NOT NULL,

    INDEX `stock_holdings_userId_symbol_idx`(`userId`, `symbol`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `stock_watchlists` (
    `id` VARCHAR(191) NOT NULL,
    `symbol` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `shortName` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `stock_watchlists_userId_symbol_key`(`userId`, `symbol`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `transactions_stockOrderId_key` ON `transactions`(`stockOrderId`);

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_stockOrderId_fkey` FOREIGN KEY (`stockOrderId`) REFERENCES `stock_orders`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `stock_orders` ADD CONSTRAINT `stock_orders_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `stock_portfolios` ADD CONSTRAINT `stock_portfolios_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `stock_holdings` ADD CONSTRAINT `stock_holdings_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `stock_holdings` ADD CONSTRAINT `stock_holdings_portfolioId_fkey` FOREIGN KEY (`portfolioId`) REFERENCES `stock_portfolios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `stock_watchlists` ADD CONSTRAINT `stock_watchlists_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
