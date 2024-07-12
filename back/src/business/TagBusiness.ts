import { TagDatabase } from "../data/TagDatabase"
import { DataNotFound } from "../error/DataNotFound"
import { DuplicateEntryError } from "../error/DuplicateEntryError"
import { InvalidInputError } from "../error/InvalidInputError"
import { TagInputDTO, TagInsertDTO } from "../model/Tag"
import { IdGenerator } from "../services/IdGenerator"

export class TagBusiness {

    constructor(
        private idGenerator: IdGenerator,
        private tagDatabase: TagDatabase,
    ) { }

    async createTag(input: TagInputDTO) {
        if (!input.name) {
            throw new InvalidInputError("Preencha o campo 'nome'")
        }

        const tag = await this.tagDatabase.getTagByName(input.name)

        if (tag) {
            throw new DuplicateEntryError("Tag já cadastrada!")
        }

        const id = this.idGenerator.generate()

        const newTag: TagInsertDTO = {
            id,
            name: input.name,
        }

        await this.tagDatabase.createTag(newTag)
    }

    async getTags() {
        const tags = await this.tagDatabase.getTags()

        return tags
    }

    async getTagByName(name: string) {
        if (!name) {
            throw new InvalidInputError("Preencha o campo 'nome'")
        }

        const tag = await this.tagDatabase.getTagByName(name)

        return tag
    }

    async getTagById(id: string) {
        if (!id) {
            throw new InvalidInputError("Preencha o campo 'id'")
        }

        const tag = await this.tagDatabase.getTagById(id)

        if (!tag) {
            throw new DataNotFound("Tag não encontrada")
        }

        return tag
    }

    async deleteTag(id: string) {
        if (!id) {
            throw new InvalidInputError("Preencha o campo 'id'")
        }

        const tag = await this.tagDatabase.getTagById(id)

        if (!tag) {
            throw new DataNotFound("Tag não encontrada")
        }

        await this.tagDatabase.deleteTag(id)
    }
}