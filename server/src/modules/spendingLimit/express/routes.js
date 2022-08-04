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
    const foodEntityList = await spendingLimitService.getWarningMonthLimitList(filters)
    res.status(200)
    res.send(foodEntityList)
  } catch (e) {
    throw e
  }  
}

module.exports = {
  getSpendingLimitWarningListRoute,
}
