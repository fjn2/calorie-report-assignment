/*
  Warnings:

  - You are about to drop the column `calorie` on the `FoodEntry` table. All the data in the column will be lost.
  - Added the required column `calories` to the `FoodEntry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `whenFoodWasTaken` to the `FoodEntry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FoodEntry" DROP COLUMN "calorie",
ADD COLUMN     "calories" INTEGER NOT NULL,
ADD COLUMN     "whenFoodWasTaken" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" TEXT NOT NULL;
