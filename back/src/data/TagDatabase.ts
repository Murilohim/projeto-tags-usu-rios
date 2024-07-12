import { Knex } from "knex";
import { Tag } from "../model/Tag";
import { BaseDatabase } from "./BaseDatabase";
import { DuplicateEntryError } from "../error/DuplicateEntryError";

export class TagDatabase extends BaseDatabase {

    async createTag(tag: any, trx?: Knex.Transaction): Promise<void> {
        try {
            const query = this.getConnection().insert({
                id: tag.id,
                name: tag.name
            }).into(this.tableNames.tags);

            if (trx) {
                await query.transacting(trx);
            } else {
                await query;
            }


        } catch (error: any) {
            if (error.code === 'ER_DUP_ENTRY') {
                throw new DuplicateEntryError('Entrada duplicada: O nome da tag já existe.')
            } else {
                throw new Error(error.sqlMessage || error.message);
            }
        }
    }

    async getTags(): Promise<Tag[]> {
        try {
            const result = await this.getConnection()
                .select("*")
                .from(this.tableNames.tags)

            return result

        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    async getTagByName(name: string): Promise<Tag> {
        try {
            const result = await this.getConnection()
                .select("*")
                .from(this.tableNames.tags)
                .where({ name });

            return result[0];

        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    async getTagById(id: string): Promise<Tag | undefined> {
        try {
            const result = await this.getConnection()
                .select("*")
                .from(this.tableNames.tags)
                .where({ id });

            if (!result[0]) {
                return undefined
            }
            return Tag.toTagModel(result[0]);

        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    async deleteTag(id: string): Promise<void> {
        try {
            await this.getConnection()
                .delete()
                .from(this.tableNames.tags)
                .where({ id });

        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
}