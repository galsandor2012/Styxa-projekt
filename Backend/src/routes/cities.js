import { Router } from 'express'
import { cityController } from '../controllers/cities.js'

export const cityRouter = Router()

cityRouter.get('/', cityController.GetCities)
cityRouter.get('/:id', cityController.GetCityById)
cityRouter.post('/', cityController.AddCity)
cityRouter.put('/:id', cityController.UpdateCity)
cityRouter.delete('/:id', cityController.DeleteCity)
