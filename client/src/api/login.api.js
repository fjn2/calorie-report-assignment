import { ApiErrorHandler } from "./utils/ApiErrorHandler"
import { getAuthorizationToken } from "./utils/getAuthorizationToken"

const HOST = process.env.REACT_APP_BACKEND_URL

export const loginApi = ({
  email,
  password,
}) => {
  return fetch(`${HOST}/auth/login`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password
    }),
  }).then(ApiErrorHandler)
}

export const meApi = () => {
  return fetch(`${HOST}/auth/me`, {
    method: 'GET',
    headers: {
      'authorization': getAuthorizationToken()
    }
  }).then(ApiErrorHandler)
}