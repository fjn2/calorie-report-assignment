const processIdMidleware = (req, res, next) => {
  res.header('x-process-id-track', process.pid)
  next()
}

module.exports = {
  processIdMidleware
}