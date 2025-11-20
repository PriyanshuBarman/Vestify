/*
  Warnings:

  - Made the column `nav` on table `mf_portfolios` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `mf_portfolios` MODIFY `nav` JSON NOT NULL;
