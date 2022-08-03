const { Prisma } = require('@prisma/client')
const { ApiError } = require('../../../utils/apiError.js')

/**
 * 
 * @param {{
 *  spendingLimitService: import('../spendingLimit.service').SpendingLimitServiceInstance}
 * }
 */
const getSpendingLimitWarningListRoute = ({ spendingLimitService }) => async (req, res) => {
  
  const filters = req.body || {}
  if (req.auth.role === 'USER') {
    // add user id in the request to restrict data access
    filters.userId = req.auth.userId
  }
  try {
    foodEntityList = await spendingLimitService.getWarningMonthLimitList(filters)
  } catch (e) {
    throw e
  }
  
  res.status(200)
  res.send(foodEntityList)
}

module.exports = {
  getSpendingLimitWarningListRoute,
}
