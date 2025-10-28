-- AlterTable
ALTER TABLE `users` ADD COLUMN `authProvider` ENUM('GOOGLE', 'FACEBOOK', 'GITHUB', 'TWITTER') NULL;
