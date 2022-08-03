const bodyParser = require('body-parser');
const { body } = require('express-validator');
const { requestValidatorMidleware } = require('../../utils/express/requestValidator');
const PrismaService = require('../prisma/prisma.service');
const AuthService = require('./auth.service');
const { secureUrlMidleware, secureUrlByRolMidleware } = require('./express/midlewares');
const { signupRoute, meRoute, logoutRoute, logInRoute, userListRoute } = require('./express/routes');

const basePath = '/auth'

const AuthModule = (app) => {
  const prisma = PrismaService.getInstance()
  const authService = new AuthService({ prisma })

  app.post(`${basePath}/login`, [
    bodyParser.json(),
    body('email').exists(),
    body('password').exists(),
    requestValidatorMidleware,
    logInRoute({ authService })
  ])

  app.post(`${basePath}/signup`, [
    bodyParser.json(),
    body('email').exists(),
    body('password').isLength({ min: 5 }),
    requestValidatorMidleware,
    signupRoute({ authService })
  ])

  app.get(`${basePath}/logout`, secureUrlMidleware({ authService }))
  app.get(`${basePath}/logout`, logoutRoute({ authService }))

  app.get(`${basePath}/me`, secureUrlMidleware({ authService }))
  app.get(`${basePath}/me`, meRoute())

  app.get(`${basePath}/users`, secureUrlMidleware({ authService }))
  app.get(`${basePath}/users`, secureUrlByRolMidleware('ADMIN'))
  app.get(`${basePath}/users`, userListRoute({ authService }))
}

module.exports = AuthModule