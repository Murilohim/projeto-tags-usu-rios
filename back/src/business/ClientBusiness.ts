import { ClientDatabase } from "../data/ClientDatabase"
import { ClientTagDatabase } from "../data/ClientTagDatabase"
import { TagDatabase } from "../data/TagDatabase"
import { BaseError } from "../error/BaseError"
import { DataNotFound } from "../error/DataNotFound"
import { DuplicateEntryError } from "../error/DuplicateEntryError"
import { InvalidInputError } from "../error/InvalidInputError"
import { ClientInputDTO, ClientInsertDTO } from "../model/Client"
import { ClientTagInsertDTO, ClientWithTagsInputDTO } from "../model/ClientTag"
import { TagInsertDTO } from "../model/Tag"
import { IdGenerator } from "../services/IdGenerator"

export class ClientBusiness {

    constructor(
        private idGenerator: IdGenerator,
        private clientDatabase: ClientDatabase,
    ) { }

    async createClient(input: ClientInputDTO) {
        if (!input.name || !input.email) {
            throw new InvalidInputError("Preencha os campos 'nome' e 'email'")
        }

        if (!input.email.includes("@")) {
            throw new InvalidInputError("Email inválido!")
        }

        const client = await this.clientDatabase.getClientByEmailOrName(undefined, input.email)

        if (client.length > 0) {
            throw new DuplicateEntryError("Email já cadastrado!")
        }

        const id = this.idGenerator.generate()

        const newClient: ClientInsertDTO = {
            id,
            name: input.name,
            email: input.email
        }

        await this.clientDatabase.createClient(newClient)
    }

    async getClients() {
        const clients = await this.clientDatabase.getClients()

        return clients
    }

    async getClientById(id: string) {
        if (!id) {
            throw new InvalidInputError("Preencha o campo 'id'")
        }

        const client = await this.clientDatabase.getClientById(id)

        if (!client) {
            throw new DataNotFound("Cliente não encontrado ou não existente para o id informado!")
        }

        return client
    }

    async getClientByEmailOrName(name: string, email: string) {
        if (!name && !email) {
            throw new InvalidInputError("Preencha ao menos um dos campos 'name' ou 'email' nos parâmetros da busca!")
        }

        const clients = await this.clientDatabase.getClientByEmailOrName(name, email)

        return clients
    }

    async updateClient(id: string, name: string, email: string, tagIds?: string[]) {
        if (!id) {
            throw new InvalidInputError("Preencha o campo 'id'")
        }

        if (!name || !email) {
            throw new InvalidInputError("Preencha os campos 'nome' e 'email'")
        }

        const client = await this.clientDatabase.getClientById(id)

        if (!client) {
            throw new DataNotFound("Cliente não encontrado ou não existente para o id informado!")
        }

        const trx = await this.clientDatabase.startTransaction();

        try {
            await this.clientDatabase.updateClient(id, name, email, trx);

            if (Array.isArray(tagIds)) {
                const clientTagDatabase = new ClientTagDatabase();
                await clientTagDatabase.deleteClientTagsByClientId(id, trx);

                if (tagIds.length > 0) {
                    for (const tagId of tagIds) {
                        const newClientTag: ClientTagInsertDTO = {
                            clientId: id,
                            tagId: tagId
                        };

                        await clientTagDatabase.createClientTag(newClientTag, trx);
                    }
                }
            }

            await trx.commit();
        } catch (error: any) {
            await trx.rollback();
            if (error instanceof BaseError) {
                throw error;
            } else {
                throw new Error(error.message || "Erro ao criar cliente e associar tags");
            }
        }
    }

    async deleteClient(id: string) {
        if (!id) {
            throw new InvalidInputError("Preencha o campo 'id'")
        }

        const client = await this.clientDatabase.getClientById(id)

        if (!client) {
            throw new DataNotFound("Cliente não encontrado ou não existente para o id informado!")
        }

        await this.clientDatabase.deleteClient(id)
    }

    async createClientWithTags(input: ClientWithTagsInputDTO) {
        if (!input.name || !input.email) {
            throw new InvalidInputError("Preencha os campos 'nome' e 'email'");
        }

        if (!input.email.includes("@")) {
            throw new InvalidInputError("Email inválido!");
        }

        const idGenerator = new IdGenerator();
        const clientId = idGenerator.generate();

        const newClient: ClientInsertDTO = {
            id: clientId,
            name: input.name,
            email: input.email
        };

        const trx = await this.clientDatabase.startTransaction();

        try {
            await this.clientDatabase.createClient(newClient, trx);

            if (input.tagIds && Array.isArray(input.tagIds) && input.tagIds.length > 0) {
                for (const tagId of input.tagIds) {
                    const newClientTag: ClientTagInsertDTO = {
                        clientId: clientId,
                        tagId: tagId
                    };

                    const tag = await new TagDatabase().getTagById(tagId);

                    if (!tag) {
                        throw new DataNotFound(`Tag com id ${tagId} não encontrada`);
                    }

                    const clientTagDatabase = new ClientTagDatabase();
                    await clientTagDatabase.createClientTag(newClientTag, trx);
                }
            }

            await trx.commit();
        } catch (error: any) {
            await trx.rollback();
            if (error instanceof BaseError) {
                throw error;
            } else {
                throw new Error(error.message || "Erro ao criar cliente e associar tags");
            }
        }
    }

}