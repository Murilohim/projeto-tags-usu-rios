import { ClientTagDatabase } from "../data/ClientTagDatabase";
import { DataNotFound } from "../error/DataNotFound";
import { InvalidInputError } from "../error/InvalidInputError";
import { ClientTagInputDTO, ClientTagInsertDTO } from "../model/ClientTag";

export class ClientTagBusiness {
    constructor(
        private clientTagDatabase: ClientTagDatabase,
    ) { }

    async createClientTag(input: ClientTagInputDTO) {
        if (!input.clientId || !input.tagId) {
            throw new InvalidInputError("Insira um id de cliente e um id de tag válidos.");
        }

        const newClientTag: ClientTagInsertDTO = {
            clientId: input.clientId,
            tagId: input.tagId
        }
        await this.clientTagDatabase.createClientTag(newClientTag);
    }


    async getClientsTags(page: number, limit: number, sortOrder: string, search: string) {
        const clientsTags = await this.clientTagDatabase.getClientsTags(page, limit, sortOrder, search);

        return clientsTags;
    }

    async getClientTagsById(clientId: string) {
        const clientTags = await this.clientTagDatabase.getClientTagsById(clientId);

        if (!clientTags) {
            throw new DataNotFound("Cliente não encontrado ou não existente para o id informado!");
        }

        return clientTags;
    }

}