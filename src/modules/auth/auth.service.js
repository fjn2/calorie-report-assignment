/**
 * @typedef {Object} AuthServiceInstance
 * @property {function} createUser
 * @property {function} rebokeToken
 * @property {function} getIsTokenReboked
 * @property {function} loginUser
 */

const { Prisma } = require('@prisma/client')
const { ApiError } = require('../../utils/apiError')
const { comparePassword } = require('./utils/encrypt')

/**
 * @param {Object} params Configuration Object 
 * @param {import('@prisma/client').PrismaClient} params.prisma Instance of PrismaClient 
 * @returns AuthServiceInstance
 */
const AuthService = function ({
  prisma
}) {
  /**
   * Reboke a given token. The incoming token is added in a black list to invalidate it.
   * @param {string} tokenToReboke 
   */
  this.rebokeToken = async (tokenToReboke) => {
    const revokedTokensResult = await prisma.revokedTokens.create({
      data: {
        token: tokenToReboke
      }
    })
    return revokedTokensResult
  }

  /**
   * Search if the token was reboked
   * @param {string} tokenToVerify 
   * @returns {Promise<boolean>}
   */
  this.getIsTokenReboked = async (tokenToVerify) => {
    // TODO -> Implement
    return false
  }

  /**
   * Method to create a new User
   * @param {import('@prisma/client').User} user 
   * @returns Promise<{import('@prisma/client').User}>
   */
  this.createUser = async (user) => {
    let newUser

    newUser = await prisma.user.create({
      data: {
        email: user.email,
        name: user.name,
        password: user.password,
      }
    })
    
    delete newUser.password
    
    return newUser
  }

  /**
   * Method to authenticate user
   * @param {{
   *  email: string,
   *  password: string,
   * }} userCredentials 
   * @returns Promise<{import('@prisma/client').User}>
   */
   this.loginUser = async (userCredentials) => {
    let user

    user = await prisma.user.findFirst({
      where: {
        email: userCredentials.email,
      }
    })
    
    if (!user) {
      return null
    }

    
    const isCorrectPassword = await comparePassword(userCredentials.password, user.password)

    if (!isCorrectPassword) {
      return null
    }
    delete user.password
    
    return user
  }

  return this
}

module.exports = AuthService
