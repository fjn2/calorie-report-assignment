/**
 * 
 * @param {{
 *  adminReportingService: import('../adminReporting.service').AdminReportingServiceInstance}
 * }
 */
const getFoodEntryWeekComparisonRoute = ({ adminReportingService }) => async (req, res) => {
  const filters = req.query

  try {
    const foodEntryWeekComparisonResult = await adminReportingService.getFoodEntryWeekComparison(filters)
    res.status(200)
    res.send(foodEntryWeekComparisonResult)
  } catch (e) {
    throw e
  }
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
    const foodEntryWeekComparisonResult = await adminReportingService.getAvgCaloriesLast7DaysPerUser(filters)
    
    res.status(200)
    res.send(foodEntryWeekComparisonResult)
  } catch (e) {
    throw e
  }
}

module.exports = {
  getFoodEntryWeekComparisonRoute,
  getAverageNumberOfCaloriesPerUserInLast7DaysRoute
}
