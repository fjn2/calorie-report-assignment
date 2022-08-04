const { expressjwt } = require("express-jwt");
const { ApiError } = require("../../../utils/apiError");

/**
 * 
 * @param {{
 *  authService: import("../auth.service").AuthServiceInstance
 * }} param0 
 * @returns 
 */
const isRevokedCallback = ({
  authService
// eslint-disable-next-line
}) => async (req, token) => {
  const tokenToVerify = req.headers.authorization.replace(/Bearer/gi, '')
  const isTokenReboked = await authService.getIsTokenReboked(tokenToVerify);
  return isTokenReboked;
}

const secureUrlMidleware = ({
  authService
}) => [
  expressjwt({
    secret: process.env.JWT_TOKEN_SECRET,
    algorithms: ["HS256"],
    isRevoked: isRevokedCallback({ authService }),
  }),
  (err, req, res, next) => {
    if (err.name === "UnauthorizedError") {
      res.status(401).send({
        error: err.message
      });
    } else {
      next(err);
    }
  }
]

const secureUrlByRolMidleware = (role = 'USER') => [
  (req, res, next) => {
    if (req.auth.role !== role) {
      next(new ApiError('Your role does not allow to perform this action', 401))
      return
    }
    next();
  }
]

module.exports = {
  secureUrlMidleware,
  secureUrlByRolMidleware
}