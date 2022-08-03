const request = require('supertest');
const { getUserId, getAccessToken } = require('./utils/auth');

describe('Admin role with a simple reporting', () => {
  it.todo('Admin rol should have access to reporting screen')
  describe('Admin can manage all food entries', () => {
    let accessToken
    let userId
    
    beforeAll(async () => {
      accessToken = await getAccessToken('admin+manage-food-entries@admin.com')
      userId = await getUserId('federico+manage-food-entries@federico.com')
    })
    
    let foodEntryId
    
    it('create food entry', async () => {
      const response = await request(BASE_URL)
      .post('/food-entry')
      .set('authorization', `Bearer ${accessToken}`)
      .send({
        name: 'Shawarma',
        calories: 4444,
        price: 170,
        whenFoodWasTaken: new Date('2019-02-01'),
        userId,
      })
      expect(response.status).toBe(201)
      expect(response.body.id).toBeDefined()
      foodEntryId = response.body.id
    })

    it('read food entry', async () => {
      const response = await request(BASE_URL)
      .get(`/food-entry/${foodEntryId}`)
      .set('authorization', `Bearer ${accessToken}`)

      expect(response.status).toBe(200)
      expect(response.body.id).toBe(foodEntryId)
    })

    it('update food entry', async () => {
      const response = await request(BASE_URL)
      .put(`/food-entry/${foodEntryId}`)
      .set('authorization', `Bearer ${accessToken}`)
      .send({
        name: 'Falafel',
        calories: 4444,
        price: 170,
        whenFoodWasTaken: new Date('2019-02-01'),
        userId,
      })
      expect(response.status).toBe(200)
      expect(response.body.id).toBeDefined()
      expect(response.body.name).toBe('Falafel')
    })

    it('delete food entry', async () => {
      const response = await request(BASE_URL)
      .delete(`/food-entry/${foodEntryId}`)
      .set('authorization', `Bearer ${accessToken}`)

      expect(response.status).toBe(200)
      expect(response.body.id).toBe(foodEntryId)

      // Try to get the removed item
      const response2 = await request(BASE_URL)
      .get(`/food-entry/${foodEntryId}`)
      .set('authorization', `Bearer ${accessToken}`)

      expect(response2.status).toBe(404)
    })
  })
  describe('User can not manage all food entries', () => {
    let accessToken
    let userId

    let foodEntryIdCreatedByAdmin

    beforeAll(async () => {
      accessToken = await getAccessToken('juan+manage-food-entries@juan.com') // Juan is not admin
      userId = await getUserId('federico+manage-food-entries@federico.com') // Federico is another user (that is not Juan)

      // Create a Food entry with an admin to validate the read, update and delete operations
      const adminAccessToken = await getAccessToken('admin+manage-food-entries@admin.com')
      const response = await request(BASE_URL)
      .post('/food-entry')
      .set('authorization', `Bearer ${adminAccessToken}`)
      .send({
        name: 'French fries',
        calories: 4444,
        price: 170,
        whenFoodWasTaken: new Date('2019-03-01'),
        userId,
      })
      foodEntryIdCreatedByAdmin = response.body.id
    })

    it('create food entry', async () => {
      const response = await request(BASE_URL)
      .post('/food-entry')
      .set('authorization', `Bearer ${accessToken}`)
      .send({
        name: 'Carbonara',
        calories: 4444,
        price: 170,
        whenFoodWasTaken: new Date('2019-02-05'),
        userId,
      })

      expect(response.status).toBe(401)
    })

    it('read food entry', async () => {
      const response = await request(BASE_URL)
      .get(`/food-entry/${foodEntryIdCreatedByAdmin}`)
      .set('authorization', `Bearer ${accessToken}`)

      expect(response.status).toBe(401)
    })

    it('update food entry', async () => {
      const response = await request(BASE_URL)
      .put(`/food-entry/${foodEntryIdCreatedByAdmin}`)
      .set('authorization', `Bearer ${accessToken}`)
      .send({
        name: 'Patatas fritas'
      })

      expect(response.status).toBe(401)
    })

    it('delete food entry', async () => {
      const response = await request(BASE_URL)
      .delete(`/food-entry/${foodEntryIdCreatedByAdmin}`)
      .set('authorization', `Bearer ${accessToken}`)
      
      expect(response.status).toBe(401)
    })
  })

  describe('Admin special reporting', () => {
    let accessTokenAdmin
    let userId1
    let userId2
    
    beforeAll(async () => {
      // get credentials for admin
      accessTokenAdmin = await getAccessToken('admin+reporting@admin.com')
      
      userId1 = await getUserId('user+reporting+1@user.com')
      userId2 = await getUserId('user+reporting+2@user.com')

      // insert relevant data
      const dataSet = [{
        name: 'Food 1',
        calories: 342,
        price: 123,
        whenFoodWasTaken: new Date('2022-08-04'),
        userId: userId1,
      }, {
        name: 'Food 2',
        calories: 125,
        price: 123,
        whenFoodWasTaken: new Date('2022-08-04'),
        userId: userId2,
      }, {
        name: 'Food 3',
        calories: 463,
        price: 123,
        whenFoodWasTaken: new Date('2022-08-10'),
        userId: userId1,
      }, {
        name: 'Food 4',
        calories: 100,
        price: 123,
        whenFoodWasTaken: new Date('2022-08-11'),
        userId: userId2,
      }, {
        name: 'Food 5',
        calories: 452,
        price: 123,
        whenFoodWasTaken: new Date('2022-08-11'),
        userId: userId1,
      }, {
        name: 'Food 6',
        calories: 200,
        price: 123,
        whenFoodWasTaken: new Date('2022-08-12'),
        userId: userId2,
      }, {
        name: 'Food 7',
        calories: 624,
        price: 123,
        whenFoodWasTaken: new Date('2022-08-12'),
        userId: userId1,
      }]

      const promises = dataSet.map(async (itemToAdd) => {
        return request(BASE_URL)
          .post('/food-entry')
          .set('authorization', `Bearer ${accessTokenAdmin}`)
          .send(itemToAdd)
      })
      // execute the query
      await Promise.all(promises)
    })

    it('Admin get the "Added entries list" in the last days, with the comparation of the previous week', async () => {
      const response = await request(BASE_URL)
          .get('/admin-reporting/food-entry-week-comparison?date=2022-08-15')
          .set('authorization', `Bearer ${accessTokenAdmin}`)
      // evaluate the results
      expect(response.status).toBe(200)
      expect(response.body).toEqual([
        { dayOfWeek: 3, thisweekcount: 1, lastweekcount: 0 },
        { dayOfWeek: 4, thisweekcount: 2, lastweekcount: 2 },
        { dayOfWeek: 5, thisweekcount: 2, lastweekcount: 0 }
      ])
      
    })

    it('Admin get the average number of calories per user in the last 7 days', async () => {
      const response = await request(BASE_URL)
          .get('/admin-reporting/avg-number-calories-per-user?date=2022-08-15')
          .set('authorization', `Bearer ${accessTokenAdmin}`)
      
      // evaluate the results
      expect(response.status).toBe(200)
      expect(response.body).toEqual([
        { avgCaloriesLast7Days: 150, userId: 10 },
        { avgCaloriesLast7Days: 513, userId: 9 }
      ])
    })
  })
  describe('A regular user should not have access to the reports information', () => {
    let accessToken

    beforeAll(async () => {
      accessToken = await getAccessToken('user+reporting+1@user.com')
    })

    it('User tries to access food-entry last week comparison data', async () => {
      const response = await request(BASE_URL)
          .get('/admin-reporting/food-entry-week-comparison?date=2022-08-15')
          .set('authorization', `Bearer ${accessToken}`)
      
      // evaluate the results
      expect(response.status).toBe(401)
    })

    it('User tries to access last 7 days avg calories data', async () => {
      const response = await request(BASE_URL)
      .get('/admin-reporting/avg-number-calories-per-user?date=2022-08-15')
          .set('authorization', `Bearer ${accessToken}`)
      
      // evaluate the results
      expect(response.status).toBe(401)
    })
  })
})