import express from 'express'
import { TagController } from '../controller/TagController'

export const tagRouter = express.Router()
const tagController = new TagController()

tagRouter.post('/', tagController.createTag)
tagRouter.get('/', tagController.getTags)
tagRouter.get('/:name', tagController.getTagByName)
tagRouter.delete('/:id', tagController.deleteTag)
tagRouter.get('/id/:id', tagController.getTagById)