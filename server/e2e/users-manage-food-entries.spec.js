const request = require('supertest');
const { getAccessToken, getUserId } = require('./utils/auth');

describe('User should be able to manage food entries', () => {
  let accessToken
  let userId

  let foodEntryId

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
    foodEntryId = response.body.id
  })
  
  it('Food entry should contain the needed information', async () => {
    const response = await request(BASE_URL)
      .get('/food-entry')
      .set('authorization', `Bearer ${accessToken}`)

    expect(response.status).toBe(200)
    expect(response.body.data.length).toBeGreaterThan(0)

    const storedItem = response.body.data.find((item) => item.name === createFoodEntryPayload.name)

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
    expect(responseList.body.data.length).toBe(2)
  })
  
  it('The admin is the only one that can remove a food entry', async () => {
    const response = await request(BASE_URL)
      .delete(`/food-entry/${foodEntryId}`)
      .set('authorization', `Bearer ${accessToken}`)

    expect(response.status).toBe(401)
    expect(response.body).toEqual({ errors: [ { msg: 'You have to be ADMIN to perform this action' } ] })
  })
  
  it('When getting the detail of a food, with an invalid id, the server should return a propper error', async () => {
    const response = await request(BASE_URL)
      .get('/food-entry/undefined')
      .set('authorization', `Bearer ${accessToken}`)

      expect(response.status).toBe(400)
      expect(response.body).toEqual({
        errors: [
          {
            value: 'undefined',
            msg: 'Invalid value',
            param: 'id',
            location: 'params'
          }
        ]
      })
  })

  it('The date when the food was taken should not be a future date on creation', async () => {
    const response = await request(BASE_URL)
      .post('/food-entry')
      .set('authorization', `Bearer ${accessToken}`)
      .send({
        name: 'Food from the future',
        calories: 12345,
        price: 101.55,
        whenFoodWasTaken: new Date('2023-01-01')
      })

    expect(response.status).toBe(400)
    expect(response.body).toEqual({
      errors: [ { msg: 'The whenFoodWasTaken date can not be in the future' } ]
    })
  })
  it('The date when the food was taken should not be a future date on update', async () => {
    const response = await request(BASE_URL)
      .put(`/food-entry/${foodEntryId}`)
      .set('authorization', `Bearer ${accessToken}`)
      .send({
        name: 'Food from the future',
        calories: 12345,
        price: 101.55,
        whenFoodWasTaken: new Date('2023-01-02')
      })

    expect(response.status).toBe(400)
    expect(response.body).toEqual({
      errors: [ { msg: 'The whenFoodWasTaken date can not be in the future' } ]
    })
  })
})