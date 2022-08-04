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
  
  let foodEntityList
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
