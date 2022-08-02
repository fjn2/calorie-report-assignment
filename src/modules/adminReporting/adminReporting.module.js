const { query } = require('express-validator');
const { requestValidatorMidleware } = require('../../utils/express/requestValidator');
const PrismaService = require('../prisma/prisma.service');
const AdminReportingService = require('./adminReporting.service');
const { getFoodEntryWeekComparisonRoute, getAverageNumberOfCaloriesPerUserInLast7DaysRoute } = require('./express/routes');
const { secureUrlByRolMidleware, secureUrlMidleware } = require('../auth/express/midlewares');
const AuthService = require('../auth/auth.service');

const basePath = '/admin-reporting'

const AdminReportingModule = (app) => {
  const prisma = PrismaService.getInstance()
  const authService = new AuthService({ prisma })
  const adminReportingService = new AdminReportingService({ prisma })

  app.use(`${basePath}`, secureUrlMidleware({ authService }))
  app.use(`${basePath}`, secureUrlByRolMidleware('ADMIN'))

  app.get(`${basePath}/food-entry-week-comparison`, [
    query('date').default((new Date().toISOString()).substring(0,10)).isDate(),
    requestValidatorMidleware,
    getFoodEntryWeekComparisonRoute({ adminReportingService })
  ])

  app.get(`${basePath}/avg-number-calories-per-user`, [
    query('date').default((new Date().toISOString()).substring(0,10)).isDate(),
    requestValidatorMidleware,
    getAverageNumberOfCaloriesPerUserInLast7DaysRoute({ adminReportingService })
  ])
}

module.exports = AdminReportingModule