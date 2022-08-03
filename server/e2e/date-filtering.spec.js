const request = require('supertest');
const { getAccessToken, getUserId } = require("./utils/auth")

describe('Filtering by dates', () => {
  let accountToken
  let userId
  beforeAll(async () => {
    accessToken = await getAccessToken('user+filtering-dates@user.com')
    userId = await getUserId('user+filtering-dates@user.com')

    const dataSet = [{
      name: 'Food 1',
      calories: 5000,
      price: 100,
      whenFoodWasTaken: new Date('2022-02-01'),
      userId: userId,
    }, {
      name: 'Food 2',
      calories: 5000,
      price: 100,
      whenFoodWasTaken: new Date('2022-02-01'),
      userId: userId,
    }, {
      name: 'Food 3',
      calories: 5000,
      price: 100,
      whenFoodWasTaken: new Date('2022-02-21'),
      userId: userId,
    }, {
      name: 'Food 4',
      calories: 5000,
      price: 1009,
      whenFoodWasTaken: new Date('2022-02-22'),
      userId: userId,
    }, {
      name: 'Food 5',
      calories: 500,
      price: 100,
      whenFoodWasTaken: new Date('2022-03-12'),
      userId: userId,
    }, {
      name: 'Food 6',
      calories: 500,
      price: 2000,
      whenFoodWasTaken: new Date('2022-04-01'),
      userId: userId,
    }, {
      name: 'Food 7',
      calories: 5000,
      price: 1000,
      whenFoodWasTaken: new Date('2022-04-02'),
      userId: userId,
    }, {
      name: 'Food 8',
      calories: 5000,
      price: 100,
      whenFoodWasTaken: new Date('2022-04-03'),
      userId: userId,
    }, {
      name: 'Food 9',
      calories: 5000,
      price: 100,
      whenFoodWasTaken: new Date('2022-04-04'),
      userId: userId,
    }, {
      name: 'Food 10',
      calories: 240,
      price: 100,
      whenFoodWasTaken: new Date('2022-04-05'),
      userId: userId,
    }]

    const promises = dataSet.map(async (itemToAdd) => {
      return request(BASE_URL)
        .post('/food-entry')
        .set('authorization', `Bearer ${accessToken}`)
        .send(itemToAdd)
    })

    await Promise.all(promises)
  })

  it('User should be able to filter his entries by date', async () => {
    const dateFrom = '2022-03-01'
    const dateTo = '2022-04-04'

    const response = await request(BASE_URL)
      .get(`/food-entry?dateFrom=${dateFrom}&dateTo=${dateTo}`)
      .set('authorization', `Bearer ${accessToken}`)

    expect(response.status).toBe(200)
    expect(response.body.length).toBe(4)
  })
})
