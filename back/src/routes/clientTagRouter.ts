import express from 'express'
import { ClientTagController } from '../controller/ClientTagController'

export const clientTagRouter = express.Router()
const clientTagController = new ClientTagController

clientTagRouter.post('/', clientTagController.createClientTag)
clientTagRouter.get('/', clientTagController.getClientsTags)
clientTagRouter.get('/:id', clientTagController.getClientTagsById)