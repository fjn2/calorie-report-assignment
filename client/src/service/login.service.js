import { loginApi, meApi } from "../api/login.api"
import { ApiError } from "../api/utils/ApiErrorHandler"

export const loginSvc = async ({ email, password }) => {
  try {
    const response = await loginApi({
      email,
      password
    })

    return response
  } catch (e) {
    if(e instanceof ApiError) {
      if (e.code === 401) {
        throw new Error(e.data[0].msg)
      }
    }
    throw e
  }
}

export const meSvc = async () => {
  try {
    const response = await meApi()

    return response
  } catch (e) {
    if(e instanceof ApiError) {
      // Do something
      if (e.code === 401) {
        throw new Error(e.data)
      }
    }
    throw e
  }
}