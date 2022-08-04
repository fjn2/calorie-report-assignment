export function ApiError(message) {
  this.message = message
}
ApiError.prototype = new Error()

export const ApiErrorHandler = async response => {
  let body

  try {
    body = await response.json()
  } catch {
    console.error('Error parsing the response from the server')
  }

  if (![200, 201].includes(response.status)) {
    const errorObj = new ApiError()

    if (response.status === 400) {
      errorObj.message = 'Bad request'
      errorObj.code = 400
      errorObj.data = body.errors
    } else if (response.status === 401) {
      errorObj.message = 'Unauthorized'
      errorObj.code = 401
      errorObj.data = body.errors || body.error
      // if (window.location.pathname !== '/login') {
      //   window.location = '/login'
      // }
    } else if (response.status === 404) {
      // default message for the 404
      errorObj.message = 'The URL was not found'
      errorObj.code = 404
    } else if (response.status === 500) {
      // default message for the 500
      errorObj.message = 'There was an internal error'
      errorObj.code = 500
    }

    throw errorObj
  }
  return body
}