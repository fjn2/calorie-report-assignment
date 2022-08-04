const { Prisma } = require('@prisma/client')
const { ApiError } = require('../../../utils/apiError.js')

/**
 * 
 * @param {{
 *  foodEntryService: import('../foodEntry.service.js').FoodEntryServiceInstance}
 * }
 */
const createFoodEntryRoute = ({ foodEntryService }) => async (req, res, next) => {
  let newFoodEntry
  try {
    newFoodEntry = await foodEntryService.create({
      name: req.body.name,
      email: req.body.email,
      calories: req.body.calories,
      price: req.body.price,
      whenFoodWasTaken: req.body.whenFoodWasTaken,
      userId: +req.body.userId,
    }, req.auth)
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        // constrain error, not addressed yet
      }
    }
    if (e.isProblemSpaceError) {
      next(new ApiError(e.message, e.code || 401))
      return
    }
    throw e
  }
  
  res.status(201)
  res.send(newFoodEntry)
}

/**
 * 
 * @param {{
 *  foodEntryService: import('../foodEntry.service.js').FoodEntryServiceInstance}
 * }
 */
const updateFoodEntryRoute = ({ foodEntryService }) => async (req, res, next) => {
  let newFoodEntry
  try {
    [oldFoodEntry] = await foodEntryService.getList({
      id: req.params.id 
    })
    
    newFoodEntry = await foodEntryService.update({
      id: req.params.id,
      name: req.body.name,
      calories: req.body.calories,
      price: req.body.price,
      whenFoodWasTaken: req.body.whenFoodWasTaken,
      userId: +req.body.userId,
    }, oldFoodEntry, req.auth)
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        // constrain error, not addressed yet
      }
    }
    if (e.isProblemSpaceError) {
      next(new ApiError(e.message, e.code || 401))
      return
    }
    throw e
  }
  
  res.status(200)
  res.send(newFoodEntry)
}

/**
 * 
 * @param {{
 *  foodEntryService: import('../foodEntry.service.js').FoodEntryServiceInstance}
 * }
 */
const getOneFoodEntryRoute = ({ foodEntryService }) => async (req, res, next) => {
  let foodEntry
  try {
    [foodEntry] = await foodEntryService.getList({
      id: req.params.id 
    })
    // TODO move this logic inside of the service
    if (req.auth.role === 'USER' && foodEntry && foodEntry.userId !== req.auth.userId) {
      next(new ApiError('You have to be admin to perform this operation', 401))
      return
    }
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        // constrain error, not addressed yet
      }
    }

    throw e
  }
  
  if (!foodEntry) {
    next(new ApiError('Item not found', 404))
    return
  }
  res.status(200)
  res.send(foodEntry)
}


/**
 * 
 * @param {{
 *  foodEntryService: import('../foodEntry.service.js').FoodEntryServiceInstance}
 * }
 */
const deleteFoodEntryRoute = ({ foodEntryService }) => async (req, res, next) => {
  let deletedFoodEntry
  try {
    [foodEntry] = await foodEntryService.getList({
      id: req.params.id 
    })
    
    deletedFoodEntry = await foodEntryService.delete(foodEntry, req.auth)
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        // constrain error, not addressed yet
      }
    }

    if (e.isProblemSpaceError) {
      next(new ApiError(e.message, e.code || 401))
      return
    }
    
    throw e
  }
  
  res.status(200)
  res.send(deletedFoodEntry)
}

/**
 * 
 * @param {{
 *  foodEntryService: import('../foodEntry.service.js').FoodEntryServiceInstance}
 * }
 */
const getFoodEntryListRoute = ({ foodEntryService }) => async (req, res) => {
  
  const filters = req.query || {}
  if (req.auth.role === 'USER') {
    // add user id in the request to restrict data access
    filters.userId = req.auth.userId
  }
  try {
    foodEntityList = await foodEntryService.getList(filters)
  } catch (e) {
    throw e
  }
  
  res.status(200)
  res.send(foodEntityList)
}

module.exports = {
  createFoodEntryRoute,
  updateFoodEntryRoute,
  deleteFoodEntryRoute,
  getOneFoodEntryRoute,
  getFoodEntryListRoute
}
