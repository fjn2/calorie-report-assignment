const request = require('supertest');
const { getAccessToken, getUserId } = require("./utils/auth")

describe('Calorie limit warning per day', () => {
  it('User get the list of days that are over limit', async () => {
    // get credentials
    const accessToken = await getAccessToken('federico+limit-warning-per-day@federico.com')
    const userId = await getUserId('federico+limit-warning-per-day@federico.com')
    // prepare data (limit 2100 by default)
    const dataSet = [{
      name: 'Food A (exceded)',
      calories: 5000,
      price: 100,
      whenFoodWasTaken: new Date('2022-01-01'),
      userId: userId,
    }, {
      name: 'Food B',
      calories: 2100,
      price: 100,
      whenFoodWasTaken: new Date('2022-01-02'),
      userId: userId,
    }, {
      name: 'Food C.1 (exceded)',
      calories: 1000,
      price: 100,
      whenFoodWasTaken: new Date('2022-01-03'),
      userId: userId,
    }, {
      name: 'Food C.2 (exceded)',
      calories: 1000,
      price: 100,
      whenFoodWasTaken: new Date('2022-01-03'),
      userId: userId,
    }, {
      name: 'Food C.3 (exceded)',
      calories: 1000,
      price: 100,
      whenFoodWasTaken: new Date('2022-01-03'),
      userId: userId,
    }, {
      name: 'Food D.1',
      calories: 1000,
      price: 100,
      whenFoodWasTaken: new Date('2022-01-04'),
      userId: userId,
    }, {
      name: 'Food D.2',
      calories: 1000,
      price: 100,
      whenFoodWasTaken: new Date('2022-01-04'),
      userId: userId,
    }]
    
    const promises = dataSet.map(async (itemToAdd) => {
      return request(BASE_URL)
        .post('/food-entry')
        .set('authorization', `Bearer ${accessToken}`)
        .send(itemToAdd)
    })

    await Promise.all(promises)

    const response = await request(BASE_URL)
        .get('/calorie-limit')
        .set('authorization', `Bearer ${accessToken}`)
    
    expect(response.status).toBe(200)
    expect(response.body).toEqual([{
        "date": "2022-01-01T00:00:00.000Z",
        "totalCalories": 5000,
      }, {
        "date": "2022-01-03T00:00:00.000Z",
        "totalCalories": 3000,
      }
    ])
  })
})
