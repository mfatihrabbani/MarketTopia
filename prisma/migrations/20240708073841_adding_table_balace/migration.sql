-- CreateTable
CREATE TABLE `balances_user` (
    `balance_user_id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `store_id` VARCHAR(191) NOT NULL,
    `balance` INTEGER NOT NULL,

    PRIMARY KEY (`balance_user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `balances_user` ADD CONSTRAINT `balances_user_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
