const { Prisma } = require('@prisma/client')
const { ApiError } = require('../../../utils/apiError.js')

/**
 * 
 * @param {{
 *  calorieLimitService: import('../caloryLimit.service').CalorieLimitServiceInstance}
 * }
 */
const getCalorieWarningListRoute = ({ calorieLimitService }) => async (req, res) => {
  
  const filters = req.body || {}
  if (req.auth.role === 'USER') {
    // add user id in the request to restrict data access
    filters.userId = req.auth.userId
  }
  try {
    foodEntityList = await calorieLimitService.getWarningDaysList(filters)
  } catch (e) {
    throw e
  }
  
  res.status(200)
  res.send(foodEntityList)
}

module.exports = {
  getCalorieWarningListRoute,
}
