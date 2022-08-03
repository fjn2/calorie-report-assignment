const request = require('supertest');
const { getAccessToken, getUserId } = require('./utils/auth');

describe('User should be able to manage food entries', () => {
  let accessToken
  let userId

  const createFoodEntryPayload = {
    name: 'Hamburger',
    calories: 12345,
    price: 101.55,
    whenFoodWasTaken: new Date('2020-08-01')
  }

  beforeAll(async () => {
    accessToken = await getAccessToken('federico@federico.com')
    userId = await getUserId('federico@federico.com')
  })

  it('A user should be able to add a new food entry', async () => {

    const response = await request(BASE_URL)
      .post('/food-entry')
      .set('authorization', `Bearer ${accessToken}`)
      .send({
        ...createFoodEntryPayload,
        userId,
      })

    expect(response.status).toBe(201)
    expect(response.body.id).toBeDefined()
  })
  
  it('Food entry should contain the needed information', async () => {
    const response = await request(BASE_URL)
      .get('/food-entry')
      .set('authorization', `Bearer ${accessToken}`)

    expect(response.status).toBe(200)
    expect(response.body.length).toBeGreaterThan(0)

    const storedItem = response.body.find((item) => item.name === createFoodEntryPayload.name)

    expect(storedItem.name).toBeDefined()
    expect(storedItem.price).toBeDefined()
    expect(storedItem.calories).toBeDefined()
    expect(storedItem.id).toBeDefined()
  })
  
  it('User should have access to their list of food entries', async () => {
    // use a different user
    const otherUserAccessToken = await getAccessToken('juan@juan.com')
    const otherUserId = await getUserId('juan@juan.com')

    // Insert the first food entry
    const response1 = await request(BASE_URL)
      .post('/food-entry')
      .set('authorization', `Bearer ${otherUserAccessToken}`)
      .send({
        name: 'Milanesa',
        calories: 22222,
        price: 99.01,
        whenFoodWasTaken: new Date('2020-08-02'),
        userId: otherUserId,
      })

    expect(response1.status).toBe(201)
    expect(response1.body.id).toBeDefined()

    // Insert the second food entry
    const response2 = await request(BASE_URL)
      .post('/food-entry')
      .set('authorization', `Bearer ${otherUserAccessToken}`)
      .send({
        name: 'Milanesa',
        calories: 22222,
        price: 99.01,
        whenFoodWasTaken: new Date('2020-08-02'),
        userId: otherUserId,
      })

    expect(response2.status).toBe(201)
    expect(response2.body.id).toBeDefined()

    // get user food entry list
    const responseList = await request(BASE_URL)
    .get('/food-entry')
    .set('authorization', `Bearer ${otherUserAccessToken}`)

    expect(responseList.status).toBe(200)
    // Verify that the results belows to the current user
    expect(responseList.body.length).toBe(2)
  })
  
  it.todo('When getting the detail of a food, with an invalid id, the server should return a propper error')
})