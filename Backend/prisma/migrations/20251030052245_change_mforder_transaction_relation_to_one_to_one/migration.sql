/*
  Warnings:

  - A unique constraint covering the columns `[assetOrderId]` on the table `transactions` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `transactions_assetOrderId_key` ON `transactions`(`assetOrderId`);
