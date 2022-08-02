const { requestValidatorMidleware } = require('../../utils/express/requestValidator');
const PrismaService = require('../prisma/prisma.service');
const { getSpendingLimitWarningListRoute } = require('./express/routes');
const { secureUrlMidleware } = require('../auth/express/midlewares');
const AuthService = require('../auth/auth.service');
const SpendingLimitService = require('./spendingLimit.service');

const basePath = '/spending-limit'

const SpendingLimitModule = (app) => {
  const prisma = PrismaService.getInstance()
  const authService = new AuthService({ prisma })
  const spendingLimitService = new SpendingLimitService({ prisma })

  app.use(`${basePath}`, secureUrlMidleware({ authService }))

  
  app.get(`${basePath}`, [
    requestValidatorMidleware,
    getSpendingLimitWarningListRoute({ spendingLimitService })
  ])
}

module.exports = SpendingLimitModule