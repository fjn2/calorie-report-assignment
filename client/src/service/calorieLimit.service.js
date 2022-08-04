import { calorieLimitListApi } from "../api/calorieLimit.api"
import { ApiError } from "../api/utils/ApiErrorHandler"

export const getCalorieLimitListSvc = async (filters) => {
  try {
    const response = await calorieLimitListApi(filters)

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