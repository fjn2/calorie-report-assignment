import { foodListApi, foodDetailApi, updateFoodDetailApi, createFoodDetailApi, deleteFoodDetailApi } from "../api/food.api"
import { ApiError } from "../api/utils/ApiErrorHandler"
import moment from 'moment'

export const getFoodListSvc = async (filters) => {
  try {
    const response = await foodListApi(filters)

    return response
  } catch (e) {
    if(e instanceof ApiError) {
      if (e.code === 401) {
        throw new Error(e.data)
      }
    }
    throw e
  }
}

export const getFoodDetailSvc = async (id) => {
  try {
    const response = await foodDetailApi(id)

    if (response.whenFoodWasTaken) {
      // Compatibility for Antd DateTime picker
      response.whenFoodWasTaken = moment(response.whenFoodWasTaken)
    }

    return response
  } catch (e) {
    if(e instanceof ApiError) {
      if (e.code === 401) {
        throw new Error(e.data)
      }
    }
    throw e
  }
}

export const updateFoodDetailSvc = async (data) => {
  try {
    const response = await updateFoodDetailApi(data)
    
    return response
  } catch (e) {
    if(e instanceof ApiError) {
      if (e.code === 401) {
        throw new Error(e.data)
      }
    }
    throw e
  }
}

export const createFoodDetailSvc = async (data) => {
  try {
    const response = await createFoodDetailApi(data)
    
    return response
  } catch (e) {
    if(e instanceof ApiError) {
      if (e.code === 401) {
        throw new Error(e.data)
      }
      if (e.code === 400) {
        const errorMessage = e.data.map(error => `${error.msg}`).join('. ')
        throw new Error(errorMessage)
      }
    }
    throw e
  }
}

export const deleteFoodDetailSvc = async (foodId) => {
  try {
    const response = await deleteFoodDetailApi(foodId)
    
    return response
  } catch (e) {
    if(e instanceof ApiError) {
      if (e.code === 401) {
        if (e.data instanceof Array) {
          const errorMessage = e.data.map(error => `${error.msg}`).join('. ')
          throw new Error(errorMessage)
        }
        throw new Error(e.data)
      }
    }
    throw e
  }
}