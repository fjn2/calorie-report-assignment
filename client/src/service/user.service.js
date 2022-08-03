import { userListApi } from "../api/user.api"
import { ApiError } from "../api/utils/ApiErrorHandler"


export const getUserListSvc = async (filters) => {
  try {
    const response = await userListApi(filters)

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
