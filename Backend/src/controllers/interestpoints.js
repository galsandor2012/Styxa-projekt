import {
  getPointOfInterests,
  getPointOfInterestsById,
  addPointOfInterests,
  updatePointOfInterests,
  deletePointOfInterests
} from '../db/interestpoints.js'
import Joi from 'joi'

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
    const { id, name, description, city_id } = await addRule.validateAsync(
      req.body
    )
    await addPointOfInterests(id, name, description, city_id)
    res.send('Megérkezett a válasz!')
  } catch (error) {
    res.status(400).send(error)
  }
}

async function UpdatePointOfInterests(req, res) {
  try {
    const { id, name, description, city_id } = await updateRule.validateAsync(
      req.body
    )
    res.send(await updatePointOfInterests(id, name, description, city_id))
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
