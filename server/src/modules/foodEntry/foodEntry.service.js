/**
 * @typedef {Object} FoodEntryServiceInstance
 * @property {function} getList
 * @property {function} create
 * @property {function} update
 * @property {function} delete
 */

 /**
  * @param {Object} params Configuration Object 
  * @param {import('@prisma/client').PrismaClient} params.prisma Instance of PrismaClient 
  * @returns FoodEntryServiceInstance
  */
 const FoodEntryService = function ({
   prisma
 }) {
   this.getList = async ({
     id,
     userId,
     dateTo,
     dateFrom,
     skip = 0,
     take = 10,
   } = {}) => {
    const filterByDateRange = {}
    if (dateTo) {
      filterByDateRange.lt = new Date(dateTo)
    }
    if (dateFrom) {
      filterByDateRange.gt = new Date(dateFrom)
    }

    const totalItems = await prisma.foodEntry.count({
      where: {
        id,
        userId,
        whenFoodWasTaken: filterByDateRange
      }
     })

     const items = await prisma.foodEntry.findMany({
      where: {
         id,
         userId,
         whenFoodWasTaken: filterByDateRange
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          }
        }
      },
      orderBy: {
        whenFoodWasTaken: 'desc'
      },
      skip,
      take
     })
     
     const formattedItems = items.map(item => ({
       ...item,
       price: Number(item.price)
     }))

     return {
        data: formattedItems,
        count: totalItems,
        skip,
      }
   }
 
   /**
    * 
    * @param {import('@prisma/client').FoodEntry} foodEntry Object to store
    * @returns 
    */
   this.create = async (foodEntry, currentUser) => {
    if (currentUser.role === 'USER') {
      if(foodEntry.userId && foodEntry.userId !== currentUser.userId) {
        const error = new Error('You can not create food entries for other users')
        error.isProblemSpaceError = true
        throw error
      }
      foodEntry.userId = currentUser.userId
    }
    if (new Date(foodEntry.whenFoodWasTaken) > new Date()) {
      const error = new Error('The whenFoodWasTaken date can not be in the future')
      error.isProblemSpaceError = true
      error.code = 400
      throw error
    }
    const foodEntryItem = await prisma.foodEntry.create({
      data: foodEntry
    })
    return foodEntryItem
  }

  /**
    * 
    * @param {import('@prisma/client').FoodEntry} foodEntry Object to store
    * @returns 
    */
   this.update = async ({ id, ...foodEntry}, oldFoodEntry, currentUser) => {
    if (currentUser.role === 'USER' && oldFoodEntry && oldFoodEntry.userId !== currentUser.userId) {
      const error = new Error('You have to be ADMIN to perform this operation')
      error.isProblemSpaceError = true
      error.code = 401
      throw error
    }
    if (currentUser.role === 'USER') {
      foodEntry.userId = currentUser.userId
    }
    if (new Date(foodEntry.whenFoodWasTaken) > new Date()) {
      const error = new Error('The whenFoodWasTaken date can not be in the future')
      error.isProblemSpaceError = true
      error.code = 400
      throw error
    }
    const foodEntryItem = await prisma.foodEntry.update({
      where: { id },
      data: foodEntry
    })
    return foodEntryItem
  }

  /**
    * 
    * @param {import('@prisma/client').FoodEntry} foodEntry Object to store
    * @returns the deleted item
    */
   this.delete = async (foodEntry, currentUser) => {
    if (currentUser.role === 'USER' && foodEntry && foodEntry.userId !== currentUser.userId) {
      const error = new Error('You have to be ADMIN to perform this action')
      error.isProblemSpaceError = true
      error.code = 401
      throw error
    }
    if (currentUser.role === 'USER') {
      const error = new Error('You have to be ADMIN to perform this action')
      error.isProblemSpaceError = true
      error.code = 401
      throw error
    }
    const deletedFoodEntryItem = await prisma.foodEntry.delete({
      where: { id: foodEntry.id }
    })
    return deletedFoodEntryItem
  }

  return this
 }
 
 module.exports = FoodEntryService
 