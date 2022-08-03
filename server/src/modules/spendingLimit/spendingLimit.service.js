/**
 * @typedef {Object} SpendingLimitServiceInstance
 * @property {function} getWarningMonthLimitList
 */

 /**
  * @param {Object} params Configuration Object 
  * @param {import('@prisma/client').PrismaClient} params.prisma Instance of PrismaClient 
  * @returns SpendingLimitServiceInstance
  */
 const SpendingLimitService = function ({
   prisma
 }) {
   this.getWarningMonthLimitList = async ({
     userId,
   } = {}) => {
    const MAX_PRICE_ALERT = 1000

    const result = await prisma.$queryRaw`SELECT
    sum("price") as totalPrice,
    TO_CHAR("whenFoodWasTaken", 'YYYY-MM') as period
    FROM "FoodEntry"
      INNER JOIN "User" on "FoodEntry"."userId" = "User"."id"
    WHERE "FoodEntry"."userId" = ${userId}
    GROUP BY TO_CHAR("whenFoodWasTaken", 'YYYY-MM')
    HAVING sum("price") > ${MAX_PRICE_ALERT}
    ORDER BY TO_DATE(TO_CHAR("whenFoodWasTaken", 'YYYY-MM'), 'YYYY-MM');`

    const formattedResult = result.map((item) => ({
      totalPrice: Number(item.totalprice),
      period: item.period
    }))

    return formattedResult
   }

   return this
 }
 
 module.exports = SpendingLimitService
 