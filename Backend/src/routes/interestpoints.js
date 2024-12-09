import { Router } from 'express'
import { pointofinterestsController } from '../controllers/interestpoints.js'

export const pointofinterestsRouter = Router()

pointofinterestsRouter.get('/', pointofinterestsController.GetPointOfInterests)
pointofinterestsRouter.get(
  '/:id',
  pointofinterestsController.GetPointOfInterestsById
)
pointofinterestsRouter.post('/', pointofinterestsController.AddPointOfInterests)
pointofinterestsRouter.put(
  '/:id',
  pointofinterestsController.UpdatePointOfInterests
)
pointofinterestsRouter.delete(
  '/:id',
  pointofinterestsController.DeletePointOfInterests
)
