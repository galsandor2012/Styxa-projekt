import {
  getCounties,
  getCountryById,
  addCountry,
  updateCountry,
  deleteCountry
} from '../db/countries.js'
import Joi from 'joi'

const addRule = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().required().min(3),
  description: Joi.string().required().min(3),
  latitude: Joi.number().required(),
  longitude: Joi.number().required()
})

const updateRule = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().required().min(3),
  description: Joi.string().required().min(3),
  latitude: Joi.number().required(),
  longitude: Joi.number().required()
})

async function GetCounties(req, res) {
  res.send(await getCounties())
}

async function GetCountryById(req, res) {
  try {
    const { id } = req.params
    const country = await getCountryById(id)
    res.send(country)
  } catch (error) {
    res.status(404).send({ error: error.message })
  }
}

async function AddCountry(req, res) {
  try {
    const { id, name, description, latitude, longitude } =
      await addRule.validateAsync(req.body)
    await addCountry(id, name, description, latitude, longitude)
    res.send('Megérkezett a válasz!')
  } catch (error) {
    res.status(400).send(error)
  }
}

async function UpdateCountry(req, res) {
  try {
    const { id, name, description, latitude, longitude } =
      await updateRule.validateAsync(req.body)
    res.send(await updateCountry(id, name, description, latitude, longitude))
  } catch (error) {
    res.status(400).send(error)
  }
}

async function DeleteCountry(req, res) {
  const { id } = req.params
  res.send(await deleteCountry(id))
}

export const countryController = {
  GetCounties,
  GetCountryById,
  AddCountry,
  UpdateCountry,
  DeleteCountry
}
