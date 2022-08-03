const { requestValidatorMidleware } = require('../../utils/express/requestValidator');
const PrismaService = require('../prisma/prisma.service');
const { getCalorieWarningListRoute } = require('./express/routes');
const { secureUrlMidleware } = require('../auth/express/midlewares');
const AuthService = require('../auth/auth.service');
const CalorieLimitService = require('./caloryLimit.service');

const basePath = '/calorie-limit'

const CalorieLimitModule = (app) => {
  const prisma = PrismaService.getInstance()
  const authService = new AuthService({ prisma })
  const calorieLimitService = new CalorieLimitService({ prisma })

  app.use(`${basePath}`, secureUrlMidleware({ authService }))

  
  app.get(`${basePath}`, [
    requestValidatorMidleware,
    getCalorieWarningListRoute({ calorieLimitService })
  ])
}

module.exports = CalorieLimitModule