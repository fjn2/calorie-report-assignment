const request = require('supertest');
const { getAccessToken } = require("./utils/auth")

describe('User list', () => {
  it('should return the list of users', async () => {
    const accessToken = await getAccessToken('admin+searching-users@admin.com')
    const response = await request(BASE_URL)
        .get('/auth/users')
        .set('authorization', `Bearer ${accessToken}`)
    
    expect(response.status).toBe(200)
    expect(response.body.length).toBeGreaterThan(2)
  })

  it('normal users should not have access to this data', async () => {
    const accessToken = await getAccessToken('user+searching-users@user.com')
    const response = await request(BASE_URL)
      .get('/auth/users')
      .set('authorization', `Bearer ${accessToken}`)

    expect(response.status).toBe(401)
  })
})
