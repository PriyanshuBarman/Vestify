-- DropIndex
DROP INDEX `email_change_requests_otpHash_idx` ON `email_change_requests`;

-- CreateIndex
CREATE INDEX `email_change_requests_userId_idx` ON `email_change_requests`(`userId`);
