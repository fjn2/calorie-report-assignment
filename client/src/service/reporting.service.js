import { avgNumberOfCaloriesPerUserApi, foodEntryWeekComparisonApi } from "../api/reporting.api"
import { ApiError } from "../api/utils/ApiErrorHandler"

export const foodEntryWeekComparisonSvc = async (filters) => {
  try {
    const response = await foodEntryWeekComparisonApi(filters)

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

export const avgNumberOfCaloriesPerUserSvc = async (filters) => {
  try {
    const response = await avgNumberOfCaloriesPerUserApi(filters)

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