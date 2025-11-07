-- DropForeignKey
ALTER TABLE `transactions` DROP FOREIGN KEY `transactions_assetOrderId_fkey`;

-- DropForeignKey
ALTER TABLE `transactions` DROP FOREIGN KEY `transactions_peerUserId_fkey`;

-- DropForeignKey
ALTER TABLE `transactions` DROP FOREIGN KEY `transactions_userId_fkey`;

-- DropIndex
DROP INDEX `transactions_peerUserId_fkey` ON `transactions`;

-- DropIndex
DROP INDEX `transactions_userId_fkey` ON `transactions`;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_peerUserId_fkey` FOREIGN KEY (`peerUserId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_assetOrderId_fkey` FOREIGN KEY (`assetOrderId`) REFERENCES `mf_orders`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
