/**
 * 
 * @param {{
 *  adminReportingService: import('../adminReporting.service').AdminReportingServiceInstance}
 * }
 */
const getFoodEntryWeekComparisonRoute = ({ adminReportingService }) => async (req, res) => {
  const filters = req.query

  try {
    foodEntryWeekComparisonResult = await adminReportingService.getFoodEntryWeekComparison(filters)
  } catch (e) {
    throw e
  }
  
  res.status(200)
  res.send(foodEntryWeekComparisonResult)
}

/**
 * 
 * @param {{
 *  adminReportingService: import('../adminReporting.service').AdminReportingServiceInstance}
 * }
 */
const getAverageNumberOfCaloriesPerUserInLast7DaysRoute = ({ adminReportingService }) => async (req, res) => {
  const filters = req.query

  try {
    foodEntryWeekComparisonResult = await adminReportingService.getAvgCaloriesLast7DaysPerUser(filters)
  } catch (e) {
    throw e
  }
  
  res.status(200)
  res.send(foodEntryWeekComparisonResult)
}

module.exports = {
  getFoodEntryWeekComparisonRoute,
  getAverageNumberOfCaloriesPerUserInLast7DaysRoute
}
