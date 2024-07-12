import { Knex } from "knex";
import { Client, ClientInsertDTO } from "../model/Client";
import { BaseDatabase } from "./BaseDatabase";
import { DataNotFound } from "../error/DataNotFound";
import { DuplicateEntryError } from "../error/DuplicateEntryError";

export class ClientDatabase extends BaseDatabase {

    async createClient(newClient: ClientInsertDTO, trx?: Knex.Transaction): Promise<void> {
        try {
            const query = this.getConnection().insert({
                id: newClient.id,
                name: newClient.name,
                email: newClient.email
            }).into(this.tableNames.clients);

            if (trx) {
                await query.transacting(trx);
            } else {
                await query;
            }

        } catch (error: any) {
            if (error.code === 'ER_DUP_ENTRY') {
                throw new DuplicateEntryError('Entrada duplicada: O email do cliente já existe.')
            } else {
                throw new Error(error.sqlMessage || error.message)
            }
        }
    }

    async getClients(): Promise<Client[]> {
        try {
            const result = await this.getConnection()
                .select("*")
                .from(this.tableNames.clients);


            return result

        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    async getClientById(id: string): Promise<Client | undefined> {
        try {
            const result = await this.getConnection()
                .select("*")
                .from(this.tableNames.clients)
                .where({ id });

            if (result.length === 0) {
                return result[0]
            }

            return Client.toClientModel(result[0]);

        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    async getClientByEmailOrName(name: string | undefined, email: string | undefined): Promise<Client[]> {
        try {
            const result = this.getConnection()
                .select("*")
                .from(this.tableNames.clients)
                .where("name", "like", `%${name}%`)
                .orWhere("email", "like", `%${email}%`);

            return result;

        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    async updateClient(id: string, name: string, email: string, trx?: Knex.Transaction): Promise<void> {
        try {
            await this.getConnection()
                .update({ name, email })
                .from(this.tableNames.clients)
                .where({ id });

        } catch (error: any) {
            if (error.code === 'ER_DUP_ENTRY') {
                throw new DuplicateEntryError('Entrada duplicada: O email do cliente já existe.')
            } else {
                throw new Error(error.sqlMessage || error.message)
            }
        }
    }

    async deleteClient(id: string): Promise<void> {
        try {
            await this.getConnection()
                .delete()
                .from(this.tableNames.clients)
                .where({ id });

        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
}