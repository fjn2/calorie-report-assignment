import { notification } from 'antd'
import { useState, useEffect } from 'react'
import { createFoodDetailSvc, deleteFoodDetailSvc, getFoodListSvc } from '../service/food.service'
import useApplication from './useApplication'
import useCalorieLimit from './useCalorieLimit'
import useSpendingLimit from './useSpendingLimit'

const PAGE_SIZE = 10

const useFoodList = () => {
  const [loading, setLoading] = useState()
  const [items, setItems] = useState()
  const [meta, setMeta] = useState({})

  const [filters, setFilters] = useState({
    take: PAGE_SIZE
  })

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

  const getNextPage = () => {
    if (items.length < meta.count) {
      setLoading(true)
      getFoodListSvc({
        ...filters,
        skip: items.length
      })
      .then(resp => {
        setItems([...items, ...resp.data])
        setLoading(false)
      }).catch(e => {
        notification.error({
          description: e.message
        })
      })
    }
  }

  useEffect(() => {
    setLoading(true)
    getFoodListSvc(filters)
    .then(resp => {
      setItems(resp.data)
      setMeta(resp.meta)
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

  const hasMore = (items || []).length < meta.count

  return {
    createFood,
    deleteFood,
    filters,
    getNextPage,
    hasMore,
    items: enhancementItems,
    loading,
    meta,
    setFilters,
  }
}

export default useFoodList
