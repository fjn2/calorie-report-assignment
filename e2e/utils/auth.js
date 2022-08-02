const request = require('supertest');
const mockData = require('../../src/modules/prisma/_mockData.json')

const getAccessToken = async (email) => {
  const response = await request(BASE_URL)
    .post('/auth/login')
    .send({
      email,
      password: '12345' // harcoded password for testing
    })
  if (!response.body.auth_token) {
    throw new Error('Login fail for: ' + email)
  }
  return response.body.auth_token
  
}

const getUserId = async (email) => {
  const user = mockData.users.find((user) => user.email === email)

  if (!user) {
    throw new Error('The following mail was not found: ' + email)
  }

  return user.id
}

module.exports = {
  getAccessToken,
  getUserId
}