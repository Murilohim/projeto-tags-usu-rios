import { Request, Response } from "express";
import { ClientInputDTO } from "../model/Client";
import { ClientBusiness } from "../business/ClientBusiness";
import { ClientDatabase } from "../data/ClientDatabase";
import { ClientWithTagsInputDTO } from "../model/ClientTag";
import { BaseError } from "../error/BaseError";
import { IdGenerator } from "../services/IdGenerator";

export class ClientController {

    async createClient(req: Request, res: Response) {
        try {
            const input: ClientInputDTO = {
                name: req.body.name,
                email: req.body.email,
            }

            const clientBusiness = new ClientBusiness(new IdGenerator, new ClientDatabase);
            await clientBusiness.createClient(input);

            res.status(201).send({ message: "Cliente cadastrado com sucesso!" });
        } catch (error) {
            if (error instanceof BaseError) {
                const { code, message } = error
                res.status(code).send({ message });
            } else {
                res.status(500).send({ message: "Erro inesperado!" });
            }
        }
    }


    async getClients(req: Request, res: Response) {
        try {

            const clientBusiness = new ClientBusiness(new IdGenerator, new ClientDatabase);
            const clients = await clientBusiness.getClients();

            res.status(200).send({ clients });
        } catch (error) {
            if (error instanceof BaseError) {
                const { code, message } = error
                res.status(code).send({ message });
            } else {
                res.status(500).send({ message: "Erro inesperado!" });
            }
        }
    }

    async getClientById(req: Request, res: Response) {
        try {
            const id = req.params.id as string;

            const clientBusiness = new ClientBusiness(new IdGenerator, new ClientDatabase);
            const client = await clientBusiness.getClientById(id);

            res.status(200).send({ client });
        } catch (error) {
            if (error instanceof BaseError) {
                const { code, message } = error
                res.status(code).send({ message });
            } else {
                res.status(500).send({ message: "Erro inesperado!" });
            }
        }
    }

    async getClientByEmailOrName(req: Request, res: Response) {
        try {
            const name = req.query.name as string;
            const email = req.query.email as string;

            const clientBusiness = new ClientBusiness(new IdGenerator, new ClientDatabase);
            const client = await clientBusiness.getClientByEmailOrName(name, email);

            res.status(200).send({ client });
        } catch (error) {
            if (error instanceof BaseError) {
                const { code, message } = error
                res.status(code).send({ message });
            } else {
                res.status(500).send({ message: "Erro inesperado!" });
            }
        }
    }

    async updateClient(req: Request, res: Response) {
        try {
            const id = req.params.id as string;
            const name = req.body.name as string;
            const email = req.body.email as string;
            const tagIds = req.body.tagIds as string[]

            const clientBusiness = new ClientBusiness(new IdGenerator, new ClientDatabase);
            await clientBusiness.updateClient(id, name, email, tagIds);

            res.status(200).send({ message: "Cliente atualizado com sucesso!" });
        } catch (error) {
            if (error instanceof BaseError) {
                const { code, message } = error
                res.status(code).send({ message });
            } else {
                res.status(500).send({ message: "Erro inesperado!" });
            }
        }
    }

    async deleteClient(req: Request, res: Response) {
        try {
            const id = req.params.id as string;

            const clientBusiness = new ClientBusiness(new IdGenerator, new ClientDatabase);
            await clientBusiness.deleteClient(id);

            res.status(200).send({ message: "Cliente deletado com sucesso!" });
        } catch (error) {
            if (error instanceof BaseError) {
                const { code, message } = error
                res.status(code).send({ message });
            } else {
                res.status(500).send({ message: "Erro inesperado!" });
            }
        }
    }

    async createClientWithTags(req: Request, res: Response) {
        try {
            const input: ClientWithTagsInputDTO = {
                name: req.body.name,
                email: req.body.email,
                tagIds: req.body.tagIds
            };

            const clientBusiness = new ClientBusiness(new IdGenerator, new ClientDatabase);
            await clientBusiness.createClientWithTags(input);

            res.status(201).send({ message: "Cadastro realizado com sucesso!" });
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