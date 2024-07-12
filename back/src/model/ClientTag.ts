export class ClientTag {
    constructor(
        private clientId: string,
        private tagId: string
    ) { }

    getClientId() {
        return this.clientId;
    }

    getTagId() {
        return this.tagId;
    }

    setClientId(clientId: string) {
        this.clientId = clientId;
    }

    setTagId(tagId: string) {
        this.tagId = tagId;
    }

    static toClientTagModel(clientTag: any): ClientTag {
        return new ClientTag(clientTag.clientId, clientTag.tagId);
    }
}

export interface ClientTagInputDTO {
    clientId: string,
    tagId: string
}

export interface ClientTagInsertDTO {
    clientId: string,
    tagId: string
}

export interface ClientWithTagsInputDTO {
    name: string;
    email: string;
    tagIds: string[];
}