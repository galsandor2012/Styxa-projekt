import {
  getPointOfInterests,
  getPointOfInterestsById,
  addPointOfInterests,
  updatePointOfInterests,
  deletePointOfInterests
} from '../db/interestpoints.js'
import Joi from 'joi'

const addRule = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().required().min(3),
  description: Joi.string().required().min(3),
  googlemapsurl: Joi.number().required().min(3),
  image: Joi.number().required().min(3)
})

const updateRule = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().required().min(3),
  description: Joi.string().required().min(3),
  city_id: Joi.number().required(),
  googlemapsurl: Joi.number().required().min(3),
  image: Joi.number().required().min(3)
})

async function GetPointOfInterests(req, res) {
  res.send(await getPointOfInterests())
}

async function GetPointOfInterestsById(req, res) {
  try {
    const { id } = req.params
    const pointofinterests = await getPointOfInterestsById(id)
    res.send(pointofinterests)
  } catch (error) {
    res.status(404).send({ error: error.message })
  }
}

async function AddPointOfInterests(req, res) {
  try {
    const { id, name, description, city_id, googlemapsurl, image } =
      await addRule.validateAsync(req.body)
    await addPointOfInterests(
      id,
      name,
      description,
      city_id,
      googlemapsurl,
      image
    )
    res.send('Megérkezett a válasz!')
  } catch (error) {
    res.status(400).send(error)
  }
}

async function UpdatePointOfInterests(req, res) {
  try {
    const { id, name, description, city_id, googlemapsurl, image } =
      await updateRule.validateAsync(req.body)
    res.send(
      await updatePointOfInterests(
        id,
        name,
        description,
        city_id,
        googlemapsurl,
        image
      )
    )
  } catch (error) {
    res.status(400).send(error)
  }
}

async function DeletePointOfInterests(req, res) {
  const { id } = req.params
  res.send(await deletePointOfInterests(id))
}

export const pointofinterestsController = {
  GetPointOfInterests,
  GetPointOfInterestsById,
  AddPointOfInterests,
  UpdatePointOfInterests,
  DeletePointOfInterests
}
