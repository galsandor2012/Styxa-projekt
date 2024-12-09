import {
  getCities,
  getCityById,
  addCity,
  updateCity,
  deleteCity
} from '../db/cities.js'
import Joi from 'joi'

const addRule = Joi.object({
  name: Joi.string().required().min(3),
  description: Joi.string().required().min(3),
  population: Joi.number().required().min(0),
  country_id: Joi.number().required()
})

const updateRule = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().required().min(3),
  description: Joi.string().required().min(3),
  population: Joi.number().required(),
  country_id: Joi.number().required()
})

async function GetCities(req, res) {
  res.send(await getCities())
}

async function GetCityById(req, res) {
  try {
    const { id } = req.params
    const city = await getCityById(id)
    res.send(city)
  } catch (error) {
    res.status(404).send({ error: error.message })
  }
}

async function AddCity(req, res) {
  try {
    const { name, description, population, country_id } =
      await addRule.validateAsync(req.body)
    await addCity(name, description, population, country_id)
    res.send('Megérkezett a válasz!')
  } catch (error) {
    res.status(400).send(error)
  }
}

async function UpdateCity(req, res) {
  try {
    const { id, name, description, population, country_id } =
      await updateRule.validateAsync(req.body)
    res.send(await updateCity(id, name, description, population, country_id))
  } catch (error) {
    res.status(400).send(error)
  }
}

async function DeleteCity(req, res) {
  const { id } = req.params
  res.send(await deleteCity(id))
}

export const cityController = {
  GetCities,
  GetCityById,
  AddCity,
  UpdateCity,
  DeleteCity
}
