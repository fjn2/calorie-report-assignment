import { message, notification } from 'antd'
import { useState, useEffect } from 'react'
import { createFoodDetailSvc, deleteFoodDetailSvc, getFoodListSvc } from '../service/food.service'

const useFoodList = () => {
  const [loading, setLoading] = useState()
  const [items, setItems] = useState()

  const [filters, setFilters] = useState({})

  const deleteFood = (foodId) => {
    return deleteFoodDetailSvc(foodId).then(() => {
      notification.success({
        description: 'Item deleted successfully'
      })
      // Refresh list
      setFilters({ ...filters })
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

  return {
    loading,
    items,
    filters,
    setFilters,
    deleteFood,
    createFood
  }
}

export default useFoodList
