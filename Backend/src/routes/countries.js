import { Router } from 'express'
import { countryController } from '../controllers/countries.js'

export const countryRouter = Router()

countryRouter.get('/', countryController.GetCounties)
countryRouter.get('/:id', countryController.GetCountryById)
countryRouter.post('/', countryController.AddCountry)
countryRouter.put('/:id', countryController.UpdateCountry)
countryRouter.delete('/:id', countryController.DeleteCountry)
