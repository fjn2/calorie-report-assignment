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
   } = {}) => {
     const filterByDateRange = {}
     if (dateTo) {
      filterByDateRange.lt = new Date(dateTo)
     }
     if (dateFrom) {
      filterByDateRange.gt = new Date(dateFrom)
     }

     const items = await prisma.foodEntry.findMany({
       where: {
         id,
         userId,
         whenFoodWasTaken: filterByDateRange
       }
     })

     const formattedItems = items.map(item => ({
       ...item,
       price: Number(item.price)
     }))

     return formattedItems
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
   this.update = async ({ id, ...foodEntry}, currentUser) => {
    if (currentUser.role === 'USER') {
      foodEntry.userId = currentUser.userId
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
   this.delete = async (foodEntry) => {
    const deletedFoodEntryItem = await prisma.foodEntry.delete({
      where: { id: foodEntry.id }
    })
    return deletedFoodEntryItem
  }

  return this
 }
 
 module.exports = FoodEntryService
 