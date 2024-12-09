import { Router } from 'express'
import { usersController } from '../controllers/users.js'

export const usersRouter = Router()

usersRouter.get('/', usersController.GetUsers)
usersRouter.post('/', usersController.AddUser)
usersRouter.put('/:id', usersController.UpdateUser)
usersRouter.delete('/:id', usersController.DeleteUser)
usersRouter.post('/login', usersController.UserLogin)
