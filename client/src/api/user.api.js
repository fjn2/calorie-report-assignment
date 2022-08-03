import { ApiErrorHandler } from './utils/ApiErrorHandler'
import { getAuthorizationToken } from "./utils/getAuthorizationToken"

const HOST = process.env.REACT_APP_BACKEND_URL

export const userListApi = () => {
  return fetch(`${HOST}/auth/users`, {
    method: 'GET',
    headers: {
      'authorization': getAuthorizationToken()
    }
  }).then(ApiErrorHandler)
}
