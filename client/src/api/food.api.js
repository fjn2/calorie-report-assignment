import qs from 'qs'
import { ApiErrorHandler } from './utils/ApiErrorHandler'
import { getAuthorizationToken } from "./utils/getAuthorizationToken"

const HOST = process.env.REACT_APP_BACKEND_URL

export const foodListApi = (filters = {}) => {
  const serializedFilters = qs.stringify(filters, { arrayFormat: 'brackets' })
  return fetch(`${HOST}/food-entry?${serializedFilters}`, {
    method: 'GET',
    headers: {
      'authorization': getAuthorizationToken()
    }
  }).then(ApiErrorHandler)
}

export const foodDetailApi = (foodId) => {
  return fetch(`${HOST}/food-entry/${foodId}`, {
    method: 'GET',
    headers: {
      'authorization': getAuthorizationToken()
    }
  }).then(ApiErrorHandler)
}

export const updateFoodDetailApi = ({ id, ...data }) => {
  return fetch(`${HOST}/food-entry/${id}`, {
    method: 'PUT',
    headers: {
      'authorization': getAuthorizationToken(),
      'content-type': 'application/json',
    },
    body: JSON.stringify(data)
  }).then(ApiErrorHandler)
}

export const createFoodDetailApi = (data) => {
  return fetch(`${HOST}/food-entry`, {
    method: 'POST',
    headers: {
      'authorization': getAuthorizationToken(),
      'content-type': 'application/json',
    },
    body: JSON.stringify(data)
  }).then(ApiErrorHandler)
}

export const deleteFoodDetailApi = (foodId) => {
  return fetch(`${HOST}/food-entry/${foodId}`, {
    method: 'DELETE',
    headers: {
      'authorization': getAuthorizationToken(),
    },
  }).then(ApiErrorHandler)
}
