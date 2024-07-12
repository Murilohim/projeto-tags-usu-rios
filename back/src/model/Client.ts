export class Client {

    constructor(
        private id: string,
        private name: string,
        private email: string
    ) { }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getEmail() {
        return this.email;
    }

    setId(id: string) {
        this.id = id;
    }

    setName(name: string) {
        this.name = name;
    }

    setEmail(email: string) {
        this.email = email;
    }

    static toClientModel(client: any): Client {
        return new Client(client.id, client.name, client.email);
    }
}

export interface ClientInputDTO {
    name: string;
    email: string;
}

export interface ClientInsertDTO extends ClientInputDTO {
    id: string;
}