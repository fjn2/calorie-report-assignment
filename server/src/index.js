const express = require('express')
const { errorHandlingMidleware } = require('./utils/express/errorHandlingMidleware')
const cors = require('cors')
// Load env variables
require('dotenv').config()

const port = process.env.APP_PORT

// Modules initialization

const app = express()

app.use(cors())

const AuthModule = require('./modules/auth/auth.module')
const FoodEntryModule = require('./modules/foodEntry/foodEntry.module')
const CalorieLimitModule = require('./modules/calorieLimit/caloryLimit.module')
const SpendingLimitModule = require('./modules/spendingLimit/spendingLimit.module')
const AdminReportingModule = require('./modules/adminReporting/adminReporting.module')

AuthModule(app)
FoodEntryModule(app)
CalorieLimitModule(app)
SpendingLimitModule(app)
AdminReportingModule(app)


app.use(errorHandlingMidleware)

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
