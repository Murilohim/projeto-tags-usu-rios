import { Request, Response } from "express"
import { TagBusiness } from "../business/TagBusiness"
import { TagDatabase } from "../data/TagDatabase"
import { TagInputDTO } from "../model/Tag"
import { BaseError } from "../error/BaseError"
import { IdGenerator } from "../services/IdGenerator"

export class TagController {

    async createTag(req: Request, res: Response) {
        try {

            const input: TagInputDTO = {
                name: req.body.name
            }

            const tagBusiness = new TagBusiness(new IdGenerator(), new TagDatabase())
            await tagBusiness.createTag(input)

            res.status(201).send({ message: "Tag criada com sucesso!" })

        } catch (error) {
            if (error instanceof BaseError) {
                const { code, message } = error
                res.status(code).send({ message });
            } else {
                res.status(500).send({ message: "Erro inesperado!" });
            }
        }
    }

    async getTags(req: Request, res: Response) {
        try {
            const tagBusiness = new TagBusiness(new IdGenerator(), new TagDatabase())
            const tags = await tagBusiness.getTags()

            res.status(200).send({ tags })
        } catch (error) {
            if (error instanceof BaseError) {
                const { code, message } = error
                res.status(code).send({ message });
            } else {
                res.status(500).send({ message: "Erro inesperado!" });
            }
        }
    }

    async getTagByName(req: Request, res: Response) {
        try {
            const name = req.params.name as string

            const tagBusiness = new TagBusiness(new IdGenerator(), new TagDatabase())
            const tag = await tagBusiness.getTagByName(name)

            res.status(200).send({ tag })
        } catch (error) {
            if (error instanceof BaseError) {
                const { code, message } = error
                res.status(code).send({ message });
            } else {
                res.status(500).send({ message: "Erro inesperado!" });
            }
        }
    }

    async getTagById(req: Request, res: Response) {
        try {
            const id = req.params.id as string

            const tagBusiness = new TagBusiness(new IdGenerator(), new TagDatabase())
            const tag = await tagBusiness.getTagById(id)

            res.status(200).send({ tag })
        } catch (error) {
            if (error instanceof BaseError) {
                const { code, message } = error
                res.status(code).send({ message });
            } else {
                res.status(500).send({ message: "Erro inesperado!" });
            }
        }
    }

    async deleteTag(req: Request, res: Response) {
        try {
            const id = req.params.id as string

            const tagBusiness = new TagBusiness(new IdGenerator(), new TagDatabase())
            await tagBusiness.deleteTag(id)

            res.status(200).send({ message: "Tag deletada com sucesso!" })
        } catch (error) {
            if (error instanceof BaseError) {
                const { code, message } = error
                res.status(code).send({ message });
            } else {
                res.status(500).send({ message: "Erro inesperado!" });
            }
        }
    }
}