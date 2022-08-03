const bodyParser = require('body-parser');
const { body, param, query, check } = require('express-validator');
const { requestValidatorMidleware } = require('../../utils/express/requestValidator');
const PrismaService = require('../prisma/prisma.service');
const FoodEntryService = require('./foodEntry.service');
const { getFoodEntryListRoute, createFoodEntryRoute, getOneFoodEntryRoute, updateFoodEntryRoute, deleteFoodEntryRoute } = require('./express/routes');
const { secureUrlMidleware } = require('../auth/express/midlewares');
const AuthService = require('../auth/auth.service');

const basePath = '/food-entry'

const FoodEntryModule = (app) => {
  const prisma = PrismaService.getInstance()
  const authService = new AuthService({ prisma })
  const foodEntryService = new FoodEntryService({ prisma })

  app.use(`${basePath}`, secureUrlMidleware({ authService }))

  app.post(`${basePath}`, [
    bodyParser.json(),
    body('calories').exists().isDecimal(),
    body('name').exists(),
    body('price').exists().isDecimal(),
    body('whenFoodWasTaken').exists(),
    requestValidatorMidleware,
    createFoodEntryRoute({ foodEntryService })
  ])

  app.put(`${basePath}/:id`, [
    bodyParser.json(),
    param('id').exists(),
    param('id').toInt(),
    requestValidatorMidleware,
    updateFoodEntryRoute({ foodEntryService })
  ])
  
  app.get(`${basePath}/:id`, [
    param('id').exists(),
    param('id').toInt(),
    requestValidatorMidleware,
    getOneFoodEntryRoute({ foodEntryService })
  ])
  
  app.get(`${basePath}`, [
    // param('dateFrom').default(null).toDate(),
    // param('dateTo').default(null).toDate(),
    requestValidatorMidleware,
    getFoodEntryListRoute({ foodEntryService })
  ])

  app.delete(`${basePath}/:id`, [
    param('id').exists(),
    param('id').toInt(),
    requestValidatorMidleware,
    deleteFoodEntryRoute({ foodEntryService })
  ])
}

module.exports = FoodEntryModule