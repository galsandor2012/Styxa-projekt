import express from 'express'
import { createCountry } from './db/countries.js'
import { createCities } from './db/cities.js'
import { createPointOfInterests } from './db/interestpoints.js'
import { addColumnsToPointOfInterests } from './db/interestpoints.js'
import { createUsers } from './db/users.js'
import { countryRouter } from './routes/countries.js'
import { cityRouter } from './routes/cities.js'
import { pointofinterestsRouter } from './routes/interestpoints.js'
import { usersRouter } from './routes/users.js'
import cors from 'cors'
import morgan from 'morgan'
import bodyParser from 'body-parser'

const server = express()
const port = 4000

server.use(cors())
server.use(morgan('dev'))
server.use(bodyParser.json())

server.use('/countries', countryRouter)
server.use('/cities', cityRouter)
server.use('/pointofinterests', pointofinterestsRouter)
server.use('/users', usersRouter)

server.listen(port, () => {
  console.log(`A szerver fut a http://localhost:${port} címen`)
  createCountry()
  createCities()
  createPointOfInterests()
  addColumnsToPointOfInterests()
  createUsers()
})
