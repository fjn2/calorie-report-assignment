const request = require('supertest');
const { getUserId, getAccessToken } = require('./utils/auth');

describe('Food list pagination', () => {
  let accessToken

  beforeAll(async () => {
    await new Promise((r) => setTimeout(r, 1000)); // Two second is the estimate time to let the other tests run
    accessToken = await getAccessToken('admin+pagination@admin.com')
  })

  it('list should return meta information', async () => {
    const response = await request(BASE_URL)
      .get('/food-entry')
      .set('authorization', `Bearer ${accessToken}`)

    expect(response.status).toBe(200)
    // Expecting a larger amount o result
    expect(response.body.data.length).toBe(10)
    expect(response.body.meta).toEqual({
      count: 36,
      skip: 0
    })
  })
  it('should return the amount of results from the filters', async () => {
    const pageSize = 4
    const response = await request(BASE_URL)
      .get(`/food-entry?take=${pageSize}`)
      .set('authorization', `Bearer ${accessToken}`)

    expect(response.status).toBe(200)
    // Expecting a larger amount o result
    expect(response.body.data.length).toBe(pageSize)
    expect(response.body.meta).toEqual({
      count: 36,
      skip: 0
    })
  })

  it('should return the second page correctly', async () => {
    // get items from 0 to 20
    const pageSize = 20
    const response = await request(BASE_URL)
      .get(`/food-entry?take=${pageSize}`)
      .set('authorization', `Bearer ${accessToken}`)

    const itemsFirstAndSecondPage = response.body.data
    
    // get items from 10 to 20
    const pageSize2 = 10
    const pageSkip = 10
    const response2 = await request(BASE_URL)
      .get(`/food-entry?take=${pageSize2}&skip=${pageSkip}`)
      .set('authorization', `Bearer ${accessToken}`)
    
    const itemsSecondPage = response2.body.data

    // compare the results
    expect(itemsFirstAndSecondPage.slice(10)).toEqual(itemsSecondPage)
  })

  it('should return empty result if the pagination is out of limit', async () => {
    const pageSkip = 9999
    const response = await request(BASE_URL)
      .get(`/food-entry?skip=${pageSkip}`)
      .set('authorization', `Bearer ${accessToken}`)

    expect(response.status).toBe(200)
    expect(response.body.data.length).toBe(0)
    expect(response.body.meta).toEqual({
      count: 36,
      skip: pageSkip
    })
  })
})