import express from 'express'
import { ClientController } from '../controller/ClientController'

export const clientRouter = express.Router()
const clientController = new ClientController()

clientRouter.post('/', clientController.createClient)
clientRouter.post('/client-tag-relation', clientController.createClientWithTags)
clientRouter.get('/', clientController.getClients)
clientRouter.get('/search', clientController.getClientByEmailOrName)
clientRouter.get('/:id', clientController.getClientById)
clientRouter.put('/:id', clientController.updateClient)
clientRouter.delete('/:id', clientController.deleteClient)