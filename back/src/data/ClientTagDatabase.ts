import { Knex } from "knex";
import { ClientTag, ClientTagInsertDTO } from "../model/ClientTag";
import { BaseDatabase } from "./BaseDatabase";

export class ClientTagDatabase extends BaseDatabase {

    async createClientTag(clientTag: ClientTagInsertDTO, trx?: Knex.Transaction): Promise<void> {
        try {
            const query = this.getConnection().insert({
                client_id: clientTag.clientId,
                tag_id: clientTag.tagId
            }).into(this.tableNames.clientsTags);


            if (trx) {
                await query.transacting(trx);
            } else {
                await query;
            }

        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    async getClientsTags(page: number, limit: number, sortOrder: string, search: string): Promise<any> {
        try {
            const offset = limit * (page - 1);
            const result = await this.getConnection().raw(`
                SELECT 
                    c.id AS client_id,
                    c.name AS client_name,
                    c.email AS client_email,
                    CASE 
                        WHEN COUNT(t.id) = 0 THEN NULL 
                        ELSE JSON_ARRAYAGG(JSON_OBJECT('id', t.id, 'name', t.name)) 
                    END AS tags
                FROM 
                    ${this.tableNames.clients} c
                LEFT JOIN 
                    ${this.tableNames.clientsTags} ct ON c.id = ct.client_id
                LEFT JOIN 
                    ${this.tableNames.tags} t ON ct.tag_id = t.id
                WHERE
                    c.name LIKE "%${search}%"
                GROUP BY 
                    c.id, c.name, c.email
                ORDER BY
                    c.name ${sortOrder}
                LIMIT ? OFFSET ?;
            `, [limit, offset]),
                total = await this.getConnection().raw(`SELECT COUNT(*) AS total FROM ${this.tableNames.clients}`);

            return {
                clients: result[0],
                total: total[0][0].total
            };

        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    async getClientTagsById(clientId: string): Promise<any> {
        try {
            const result = await this.getConnection().raw(`
                SELECT 
                    c.id AS client_id,
                    c.name AS client_name,
                    c.email AS client_email,
                    CASE 
                        WHEN COUNT(t.id) = 0 THEN NULL 
                        ELSE JSON_ARRAYAGG(JSON_OBJECT('id', t.id, 'name', t.name)) 
                    END AS tags
                FROM 
                    ${this.tableNames.clients} c
                LEFT JOIN 
                    ${this.tableNames.clientsTags} ct ON c.id = ct.client_id
                LEFT JOIN 
                    ${this.tableNames.tags} t ON ct.tag_id = t.id
                WHERE 
                    c.id = ?
                GROUP BY 
                    c.id, c.name, c.email;
            `, [clientId]);

            return result[0][0];

        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    async deleteClientTagsByClientId(clientId: string, trx?: Knex.Transaction): Promise<void> {
        try {
            const query = this.getConnection().from(this.tableNames.clientsTags)
                .where('client_id', clientId)
                .del();

            if (trx) {
                await query.transacting(trx);
            } else {
                await query;
            }
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
}