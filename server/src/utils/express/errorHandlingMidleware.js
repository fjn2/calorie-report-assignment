// eslint-disable-next-line
const errorHandlingMidleware = (err, req, res, next) => {
  if (err.isApiError) {
    res.status(err.code)
    res.send({
      errors: [{
        msg: err.message
      }],
      data: err.data,
    })
    return
  }
  res.status(500)
  res.send({
    errors: [{
      msg: err.message
    }]
  })
}

module.exports = {
  errorHandlingMidleware
}