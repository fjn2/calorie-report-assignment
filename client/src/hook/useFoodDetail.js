import { notification } from 'antd'
import { useState, useEffect } from 'react'
import {
  createFoodDetailSvc,
  deleteFoodDetailSvc,
  getFoodDetailSvc,
  updateFoodDetailSvc,
} from '../service/food.service'

const useFoodDetail = (id) => {
  const [loading, setLoading] = useState()
  const [foodDetail, setFoodDetail] = useState()

  useEffect(() => {
    if (id) {
      if (id === 'new') {
        setFoodDetail({})
      } else {
        setLoading(true)
        getFoodDetailSvc(id)
        .then(resp => {
          setFoodDetail(resp)
          setLoading(false)
        })
      }
    }
  }, [id])

  const updateFood = (data) => {
    return updateFoodDetailSvc({
      id: foodDetail.id,
      ...data
    })
  }

  const createFood = (data) => {
    return createFoodDetailSvc(data).catch((e) => {
      notification.error({
        description: e.message
      })
    })
  }

  const deleteFood = (foodId) => {
    return deleteFoodDetailSvc(foodId)
  }

  return {
    loading,
    foodDetail,
    updateFood,
    createFood,
    deleteFood,
  }
}

export default useFoodDetail
