import { Request, Response } from "express";
import { ClientTagDatabase } from "../data/ClientTagDatabase";
import { ClientTagBusiness } from "../business/ClientTagBusiness";
import { ClientTagInputDTO } from "../model/ClientTag";
import { BaseError } from "../error/BaseError";

export class ClientTagController {
    async createClientTag(req: Request, res: Response) {
        try {

            const input: ClientTagInputDTO = {
                clientId: req.body.clientId,
                tagId: req.body.tagId,
            }

            const clientTagBusiness = new ClientTagBusiness(new ClientTagDatabase);
            await clientTagBusiness.createClientTag(input);

            res.status(201).send({ message: "Relação criada com sucesso!" });
        } catch (error) {
            if (error instanceof BaseError) {
                const { code, message } = error
                res.status(code).send({ message });
            } else {
                res.status(500).send({ message: "Erro inesperado!" });
            }
        }
    }


    async getClientsTags(req: Request, res: Response) {
        try {

            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 5
            const sortOrder = req.query.sortOrder === "DESC" ? "DESC" : "ASC";
            const search = req.query.search as string || "";

            const clientTagBusiness = new ClientTagBusiness(new ClientTagDatabase);
            const clientsTags = await clientTagBusiness.getClientsTags(page, limit, sortOrder, search);

            res.status(200).send({ clientsTags });
        } catch (error) {
            if (error instanceof BaseError) {
                const { code, message } = error
                res.status(code).send({ message });
            } else {
                res.status(500).send({ message: "Erro inesperado!" });
            }
        }
    }

    async getClientTagsById(req: Request, res: Response) {
        try {
            const clientId = req.params.id as string;

            const clientTagBusiness = new ClientTagBusiness(new ClientTagDatabase());
            const clientTags = await clientTagBusiness.getClientTagsById(clientId);

            res.status(200).send(clientTags);
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