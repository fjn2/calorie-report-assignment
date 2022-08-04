import { ApiErrorHandler } from "./utils/ApiErrorHandler"
import { getAuthorizationToken } from "./utils/getAuthorizationToken"

const HOST = process.env.REACT_APP_BACKEND_URL

export const calorieLimitListApi = () => {
  return fetch(`${HOST}/calorie-limit`, {
    method: 'GET',
    headers: {
      'authorization': getAuthorizationToken()
    }
  }).then(ApiErrorHandler)
}
