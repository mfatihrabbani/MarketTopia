/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `stores` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `stores` DROP FOREIGN KEY `stores_store_id_fkey`;

-- CreateIndex
CREATE UNIQUE INDEX `stores_user_id_key` ON `stores`(`user_id`);

-- AddForeignKey
ALTER TABLE `stores` ADD CONSTRAINT `stores_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
