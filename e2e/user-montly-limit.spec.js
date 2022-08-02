const request = require('supertest');
const { getAccessToken, getUserId } = require('./utils/auth');

describe('User montly limit', () => {
  it('A user should be able to add the price of each food entry', async () => {
    // get user credentials
    const accessToken = await getAccessToken('federico@federico.com')
    const userId = await getUserId('federico@federico.com')

    const price = 306
    // create new entry with price
    const response = await request(BASE_URL)
      .post('/food-entry')
      .set('authorization', `Bearer ${accessToken}`)
      .send({
          name: 'Hot dog',
          calories: 1000,
          price,
          whenFoodWasTaken: new Date('2005-02-01'),
          userId,
      })
    expect(response.status).toBe(201)
    const newFoodEntryId = response.body.id

    const response2 = await request(BASE_URL)
      .get('/food-entry')
      .set('authorization', `Bearer ${accessToken}`)

    expect(response2.status).toBe(200)
    expect(response2.body.length).toBeGreaterThan(0)
    
    const foodEntryItem = response2.body.find((foodEntry) => foodEntry.id === newFoodEntryId)
    
    expect(foodEntryItem.price).toBe(price)
  })
  it('If the user has spend more than the limit per month then, inform a warning', async () => {
    // get credentials
    const accessToken = await getAccessToken('user+price+warning@user.com')
    const userId = await getUserId('user+price+warning@user.com')
    // prepare data (limit 2100 by default)
    const dataSet = [{
      name: 'Food A (exceded)',
      calories: 123,
      price: 1001,
      whenFoodWasTaken: new Date('2012-01-01'),
      userId: userId,
    }, {
      name: 'Food B',
      calories: 123,
      price: 1000,
      whenFoodWasTaken: new Date('2012-02-02'),
      userId: userId,
    }, {
      name: 'Food C.1 (exceded)',
      calories: 123,
      price: 100,
      whenFoodWasTaken: new Date('2012-03-03'),
      userId: userId,
    }, {
      name: 'Food C.2 (exceded)',
      calories: 123,
      price: 500,
      whenFoodWasTaken: new Date('2012-03-03'),
      userId: userId,
    }, {
      name: 'Food C.3 (exceded)',
      calories: 123,
      price: 501,
      whenFoodWasTaken: new Date('2012-03-03'),
      userId: userId,
    }, {
      name: 'Food D.1',
      calories: 123,
      price: 100,
      whenFoodWasTaken: new Date('2012-04-04'),
      userId: userId,
    }, {
      name: 'Food D.2',
      calories: 123,
      price: 100,
      whenFoodWasTaken: new Date('2012-04-04'),
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
        .get('/spending-limit')
        .set('authorization', `Bearer ${accessToken}`)
    
    expect(response.status).toBe(200)
    expect(response.body).toEqual([{
        "period": "2012-01",
        "totalPrice": 1001,
      }, {
        "period": "2012-03",
        "totalPrice": 1101,
      }
    ])
  })
})
