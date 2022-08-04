import { spendingLimitListApi } from "../api/spendingLimit.api"
import { ApiError } from "../api/utils/ApiErrorHandler"

export const getSpendingLimitListSvc = async (filters) => {
  try {
    const response = await spendingLimitListApi(filters)

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