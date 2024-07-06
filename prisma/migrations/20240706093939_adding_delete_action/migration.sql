/*
  Warnings:

  - Added the required column `is_delete` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `products` ADD COLUMN `deleted_at` DATETIME(3) NULL,
    ADD COLUMN `is_delete` BOOLEAN NOT NULL;
