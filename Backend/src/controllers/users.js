import {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
  userLogin
} from '../db/users.js'
import Joi from 'joi'
import bcrypt from 'bcrypt'

const addRule = Joi.object({
  firstname: Joi.string().required().min(3),
  lastname: Joi.string().required().min(3),
  username: Joi.string().required().min(3),
  password: Joi.string().required().min(3)
})

const updateRule = Joi.object({
  id: Joi.number().required(),
  firstname: Joi.string().required().min(3),
  lastname: Joi.string().required().min(3),
  username: Joi.string().required().min(3),
  password: Joi.string().required().min(3)
})

const loginRule = Joi.object({
  username: Joi.string().required().min(3),
  password: Joi.string().required().min(3),
  confirmPassword: Joi.string().required().min(3)
})

async function GetUsers(req, res) {
  res.send(await getUsers())
}

async function AddUser(req, res) {
  try {
    const { firstname, lastname, username, password } =
      await addRule.validateAsync(req.body)
    const hashedPassword = await bcrypt.hash(password, 10)
    await addUser(firstname, lastname, username, hashedPassword)
    res.send('I have created a user!')
  } catch (error) {
    res.status(400).send(error)
  }
}

async function UpdateUser(req, res) {
  try {
    const { id, firstname, lastname, username, password } =
      await updateRule.validateAsync(req.body)
    res.send(await updateUser(id, firstname, lastname, username, password))
  } catch (error) {
    res.status(400).send(error)
  }
}

async function DeleteUser(req, res) {
  const { id } = req.params
  res.send(await deleteUser(id))
}

//////////////
async function UserLogin(req, res) {
  try {
    const { username, password, confirmPassword } =
      await loginRule.validateAsync(req.body)
    const secretPassword = await bcrypt.hash(password, 10)
    const same = await bcrypt.compare(confirmPassword, secretPassword)

    if (!same) {
      res.status(400).send('The two passwords do not match!')
      return
    }

    await userLogin(username, secretPassword)
    res.send('Successfully logged in!')
  } catch (error) {
    res.status(400).send(error)
  }
}
//////////////

export const usersController = {
  GetUsers,
  AddUser,
  UpdateUser,
  DeleteUser,
  UserLogin
}
