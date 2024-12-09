import {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
  findUserByUsername
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
  password: Joi.string().required().min(3)
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
    const { username, password } = await loginRule.validateAsync(req.body)
    const userResult = await client.query(`
      SELECT * FROM users WHERE username = '${username}'
    `)
    if (userResult.rows.length === 0) {
      res.status(401).send('Username does not exist!')
      return
    }
    const user = userResult.rows[0]
    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if (!isPasswordCorrect) {
      res.status(401).send('Invalid password!')
      return
    }
    res.send('Successfully logged in!')
  } catch (error) {
    res.status(400).send(error.message)
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
