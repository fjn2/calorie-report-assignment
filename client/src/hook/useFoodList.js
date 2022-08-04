import { notification } from 'antd'
import { useState, useEffect } from 'react'
import { createFoodDetailSvc, deleteFoodDetailSvc, getFoodListSvc } from '../service/food.service'
import useApplication from './useApplication'
import useCalorieLimit from './useCalorieLimit'
import useSpendingLimit from './useSpendingLimit'

const useFoodList = () => {
  const [loading, setLoading] = useState()
  const [items, setItems] = useState()

  const [filters, setFilters] = useState({})

  const { user } = useApplication()
  const { items: calorieLimitItems } = useCalorieLimit()
  const { items: spendingLimitItems } = useSpendingLimit()

  const deleteFood = (foodId) => {
    return deleteFoodDetailSvc(foodId).then(() => {
      notification.success({
        description: 'Item deleted successfully'
      })
      // Refresh list
      setFilters({ ...filters })
    }).catch((e) => {
      notification.error({
        description: e.message
      })
    })
  }

  const createFood = (data) => {
    return createFoodDetailSvc(data).then(() => {
      notification.success({
        description: 'Item created successfully'
      })
      // Refresh list
      setFilters({ ...filters })
    })
  }

  useEffect(() => {
    setLoading(true)
    getFoodListSvc(filters)
    .then(resp => {
      setItems(resp)
      setLoading(false)
    }).catch(e => {
      notification.error({
        description: e.message
      })
    })
  }, [filters])

  const enhancementItems = (items || []).map((item) => {
    const calorieWarning = (calorieLimitItems || []).find(cli => cli.date.substring(0, 10) === item.whenFoodWasTaken.substring(0, 10))
    const spendingLimit = (spendingLimitItems || []).find(cli => cli.period.substring(0, 7) === item.whenFoodWasTaken.substring(0, 7))
    
    return {
      ...item,
      hasCalorieWarning: !!calorieWarning,
      totalCaloriesExceded: calorieWarning && (calorieWarning.totalCalories - user.calorieWarningThreshold),
      hasReachSpendingLimit: !!spendingLimit,
      totalSpendedInPeriod: spendingLimit && spendingLimit.totalPrice,
    }
  })

  return {
    loading,
    items: enhancementItems,
    filters,
    setFilters,
    deleteFood,
    createFood
  }
}

export default useFoodList
