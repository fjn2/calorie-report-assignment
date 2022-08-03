const ApiError = function(message, code, data) {
  const error = new Error(message)
  error.code = code
  error.data = data
  error.isApiError = true
  return error
}

module.exports = {
  ApiError
}