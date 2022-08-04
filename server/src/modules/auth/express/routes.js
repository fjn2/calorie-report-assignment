const { Prisma } = require('@prisma/client');
const jwt = require('jsonwebtoken');
const { ApiError } = require('../../../utils/apiError.js');
const { cryptPassword } = require('../utils/encrypt.js');

const EXPIRATION_TIME_IN_HOURS = 1 // one hour

/**
 * @param {{
 *  authService: import('../auth.service.js').AuthServiceInstance}
 * }
 */
const logInRoute = ({ authService }) => async (req, res, next) => {
  try {
    const user = await authService.loginUser({
      email: req.body.email,
      password: req.body.password,
    })

    if (!user) {
      const error = ApiError('User or password incorrect', 401)
      next(error)
      return
    }

    const token = jwt.sign({
      userId: user.id,
      email: req.body.email,
      name: user.name,
      role: user.role,
      calorieWarningThreshold: user.calorieWarningThreshold,
      exp: Math.floor(Date.now() / 1000) + (60 * 60 * EXPIRATION_TIME_IN_HOURS),
    }, process.env.JWT_TOKEN_SECRET);

    res.type('application/json')
    res.send({
      auth_token: token
    })
  } catch (e) {
    next(e)
  }  
}

/**
 * 
 * @param {{
 *  authService: import('../auth.service.js').AuthServiceInstance}
 * }
 */
const signupRoute = ({ authService }) => async (req, res, next) => {
  let newUser

  try {
    newUser = await authService.createUser({
      name: req.body.name,
      email: req.body.email,
      password: await cryptPassword(req.body.password),
    })
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        const error = new ApiError('User already exits', 400)
        next(error)
        return
      }
    }
    throw e
  }
  

  res.send(newUser)
}

/**
 * 
 * @param {{
 *  authService: import('../auth.service.js').AuthServiceInstance}
 * }
 */
const logoutRoute = ({ authService }) => (req, res) => {
  const tokenToDisable = req.headers.authorization.replace(/Bearer/gi, '')
  authService.rebokeToken(tokenToDisable)

  res.send({ sucess: true })
}

const meRoute = () => (req, res) => {
  res.send(req.auth)
}

/**
 * 
 * @param {{
 *  authService: import('../auth.service.js').AuthServiceInstance}
 * }
 */
const userListRoute = ({ authService }) => async (req, res) => {
  const users = await authService.listUsers()

  res.send(users)
}

module.exports = {
  logInRoute,
  logoutRoute,
  meRoute,
  signupRoute,
  userListRoute,
}