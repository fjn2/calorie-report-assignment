/**
 * @typedef {Object} CalorieLimitServiceInstance
 * @property {function} getWarningDaysList
 */

 /**
  * @param {Object} params Configuration Object 
  * @param {import('@prisma/client').PrismaClient} params.prisma Instance of PrismaClient 
  * @returns CalorieLimitServiceInstance
  */
 const CalorieLimitService = function ({
   prisma
 }) {
   this.getWarningDaysList = async ({
     userId,
   } = {}) => {
    const result = await prisma.$queryRaw`SELECT
      SUM("calories") as totalCalories,
      date("whenFoodWasTaken")
      FROM "FoodEntry"
      INNER JOIN "User" on "FoodEntry"."userId" = "User"."id"
      WHERE "FoodEntry"."userId" = ${userId}
      GROUP BY date("whenFoodWasTaken"), "calorieWarningThreshold"
      HAVING SUM("calories") > "calorieWarningThreshold";`

    const formattedResult = result.map((item) => ({
      totalCalories: Number(item.totalcalories),
      date: item.date
    }))

    return formattedResult
   }

   return this
 }
 
 module.exports = CalorieLimitService
 