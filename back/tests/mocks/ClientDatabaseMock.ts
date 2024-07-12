import { Client, ClientInsertDTO } from "../../src/model/Client"
import { clientMock1, clientMock2 } from "../mocks/ClientMock"

export class ClientDatabaseMock {
    async createClient(newClient: ClientInsertDTO): Promise<void> {
        return
    }
    async getClients() {
        return [clientMock1, clientMock2]
    }
    async getClientById(id: string): Promise<Client | undefined> {
        return clientMock1
    }
    async getClientByEmailOrName(name: string, email: string): Promise<Client[]> {
        return []
    }
    async updateClient(id: string, name: string, email: string): Promise<void> {
        return
    }
    async deleteClient(id: string): Promise<void> {
        return
    }
}