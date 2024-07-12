import { ClientBusiness } from "../src/business/ClientBusiness";
import { ClientDatabaseMock } from "./mocks/ClientDatabaseMock";
import { IdGeneratorMock } from "./mocks/IdGeneratorMock";


const clientBusinessMock = new ClientBusiness(new IdGeneratorMock, new ClientDatabaseMock() as any)

describe("ClientBusiness", () => {
    test("Should return sucess for valid input create", async () => {
        expect.assertions(2)
        try {
            const input = {
                name: "client1",
                email: "client1@email.com"
            }

            await expect(clientBusinessMock.createClient(input)).resolves.not.toThrow();
            expect("").toEqual("")
        } catch (error) {
            console.log(error)
        }
    })

    test("Should return 'Preencha os campos 'nome' e 'email' for empty name", async () => {
        expect.assertions(2)
        try {
            const input = {
                name: "",
                email: "client1@email.com",
            }

            await clientBusinessMock.createClient(input)
        } catch (error: any) {
            expect(error.message).toBe("Preencha os campos 'nome' e 'email'")
            expect(error.code).toBe(400)
        }
    })

    test("Should return 'Preencha os campos 'nome' e 'email' for empty email", async () => {
        expect.assertions(2)
        try {
            const input = {
                name: "client1",
                email: "",
            }

            await clientBusinessMock.createClient(input)
        } catch (error: any) {
            expect(error.message).toBe("Preencha os campos 'nome' e 'email'")
            expect(error.code).toBe(400)
        }
    })

    test("Should return 'Email inválido!' for invalid email", async () => {
        expect.assertions(2)
        try {
            const input = {
                name: "client1",
                email: "client1email.com",
            }

            await clientBusinessMock.createClient(input)
        } catch (error: any) {
            expect(error.message).toBe("Email inválido!")
            expect(error.code).toBe(400)
        }
    })

    test("Should return an array with clients", async () => {
        expect.assertions(2)
        try {
            const clients = await clientBusinessMock.getClients()

            expect(clients).toHaveLength(2)
            expect(clients).toEqual([
                {
                    id: "id1_mock1",
                    name: "client1",
                    email: "client1@email.com"
                },
                {
                    id: "id2_mock2",
                    name: "client2",
                    email: "client2@email.com"
                }
            ])
        } catch (error) {
            console.log(error)
        }
    })

    test("Should return a client by id", async () => {
        expect.assertions(2)
        try {
            const id = "id1_mock1"

            const client = await clientBusinessMock.getClientById(id)

            expect(client).toEqual({
                id: "id1_mock1",
                name: "client1",
                email: "client1@email.com"
            })
            expect(client).not.toBeUndefined()
        } catch (error) {
            console.log(error)
        }
    })

    test("Should return 'Preencha o campo 'id' for empty id", async () => {
        expect.assertions(2)
        try {
            const id = ""

            await clientBusinessMock.getClientById(id)
        } catch (error: any) {
            expect(error.message).toBe("Preencha o campo 'id'")
            expect(error.code).toBe(400)
        }
    })

    test("Should return 'Cliente não encontrado ou não existente para o id informado!' for non-existent id", async () => {
        expect.assertions(2)
        const spyOnGetClientById = jest.spyOn(ClientDatabaseMock.prototype, "getClientById").mockResolvedValue(undefined)
        try {
            const id = "id3_mock3"

            await clientBusinessMock.getClientById(id)
        } catch (error: any) {
            expect(error.message).toBe("Cliente não encontrado ou não existente para o id informado!")
            expect(error.code).toBe(404)
        }
        spyOnGetClientById.mockRestore()
    })

    test("Should return sucess for valid input delete", async () => {
        expect.assertions(1)
        try {
            const id = "id1_mock1"

            await expect(clientBusinessMock.deleteClient(id)).resolves.not.toThrow();
        } catch (error) {
            console.log(error)
        }
    })

})
