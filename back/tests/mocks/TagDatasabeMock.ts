import { Tag } from "../../src/model/Tag"
import { TagMock1, TagMock2 } from "./TagMock"

export class TagDatabaseMock {
    async createTag(name: string): Promise<void> {
        return
    }
    async getTags() {
        return [TagMock1, TagMock2]
    }
    async getTagById(id: string): Promise<Tag | undefined> {
        return TagMock1
    }
    async getTagByName(name: string): Promise<Tag | undefined> {
        return TagMock1
    }
    async deleteTag(id: string): Promise<void> {
        return
    }
}
