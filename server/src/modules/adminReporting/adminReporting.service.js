/**
 * @typedef {Object} AdminReportingServiceInstance
 * @property {function} getFoodEntryWeekComparison
 * @property {function} getAvgCaloriesLast7DaysPerUser
 */

 /**
  * @param {Object} params Configuration Object 
  * @param {import('@prisma/client').PrismaClient} params.prisma Instance of PrismaClient 
  * @returns AdminReportingServiceInstance
  */
 const AdminReportingService = function ({
   prisma
 }) {
   this.getFoodEntryWeekComparison = async ({
     date = new Date().toISOString(),
   } = {}) => {
    const result = await prisma.$queryRawUnsafe(`SELECT
      "thisweek"."count" as thisweekCount,
      "thisweek"."dayOfTheWeek" as thisweekDayOfWeek,
      "lastweek"."count" as lastweekCount,
      "lastweek"."dayOfTheWeek" as lastweekDayOfWeek
        FROM
        (
          SELECT COUNT(*), EXTRACT('DOW' FROM "whenFoodWasTaken") as "dayOfTheWeek"
          FROM "FoodEntry"
          WHERE 
          "whenFoodWasTaken" < '${date}' 
          AND "whenFoodWasTaken" > (TO_DATE('${date}', 'YYYY-MM-DD') - INTERVAL '7 DAY')
          GROUP BY "dayOfTheWeek"
        ) thisweek
        FULL JOIN
        (
          SELECT COUNT(*), EXTRACT('DOW' FROM "whenFoodWasTaken") as "dayOfTheWeek"
          FROM "FoodEntry"
          WHERE 
          "whenFoodWasTaken" < (TO_DATE('${date}', 'YYYY-MM-DD') - INTERVAL '7 DAY')
          AND "whenFoodWasTaken" > (TO_DATE('${date}', 'YYYY-MM-DD') - INTERVAL '14 DAY')
          GROUP BY "dayOfTheWeek"
        ) lastweek
        ON
        "thisweek"."dayOfTheWeek" = "lastweek"."dayOfTheWeek"
        ORDER BY thisweekDayOfWeek, lastweekDayOfWeek;`
    )

    const formattedResult = result.map((item) => ({
      dayOfWeek: Number(item.thisweekdayofweek || item.lastweekdayofweek),
      thisweekcount: item.thisweekcount ? Number(item.thisweekcount) : 0,
      lastweekcount: item.lastweekcount ? Number(item.lastweekcount) : 0,
    }))
    return formattedResult
   }
   
   this.getAvgCaloriesLast7DaysPerUser = async ({
    date = new Date().toISOString(),
   }) => {
    const result = await prisma.$queryRawUnsafe(`SELECT
      avg("calories"),
      "User"."id",
      "User"."name"
      FROM
      "User"
      LEFT JOIN
      "FoodEntry" ON "FoodEntry"."userId" = "User"."id"
      WHERE 
      "whenFoodWasTaken" < '${date}' 
      AND "whenFoodWasTaken" > (TO_DATE('${date}', 'YYYY-MM-DD') - INTERVAL '7 DAY')
      GROUP BY
      "User"."id",
      "User"."name"
      ORDER BY avg("calories")
    `)
    
    const formattedResult = result.map((item) => ({
      avgCaloriesLast7Days: item.avg ? Number(item.avg) : 0,
      userId: item.id,
      userName: item.name,
    }))

    return formattedResult
   }
  return this
 }
 
 module.exports = AdminReportingService
 