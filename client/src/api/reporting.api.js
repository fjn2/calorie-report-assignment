import qs from 'qs'
import { ApiErrorHandler } from "./utils/ApiErrorHandler"
import { getAuthorizationToken } from "./utils/getAuthorizationToken"

const HOST = process.env.REACT_APP_BACKEND_URL

export const foodEntryWeekComparisonApi = (filters) => {
  const serializedFilters = qs.stringify(filters, { arrayFormat: 'brackets' })

  return fetch(`${HOST}/admin-reporting/food-entry-week-comparison?${serializedFilters}`, {
    method: 'GET',
    headers: {
      'authorization': getAuthorizationToken()
    }
  }).then(ApiErrorHandler)
}

export const avgNumberOfCaloriesPerUserApi = (filters) => {
  const serializedFilters = qs.stringify(filters, { arrayFormat: 'brackets' })

  return fetch(`${HOST}/admin-reporting/avg-number-calories-per-user?${serializedFilters}`, {
    method: 'GET',
    headers: {
      'authorization': getAuthorizationToken()
    }
  }).then(ApiErrorHandler)
}
