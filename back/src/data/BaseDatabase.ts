import knex, { Knex } from "knex";
import dotenv from "dotenv";
dotenv.config();

export abstract class BaseDatabase {
    private static connection: Knex | null = null;

    protected tableNames = {
        clients: "clients",
        tags: "tags",
        clientsTags: "client_tags"
    }

    protected getConnection(): Knex {
        if (!BaseDatabase.connection) {
            BaseDatabase.connection = knex({
                client: "mysql2",
                connection: {
                    host: process.env.DB_HOST,
                    port: 3306,
                    user: process.env.DB_USER,
                    password: process.env.DB_PASSWORD,
                    database: process.env.DB_NAME,
                    multipleStatements: true
                },
            });
        }

        return BaseDatabase.connection;
    }

    public async destroyConnection(): Promise<void> {
        if (BaseDatabase.connection) {
            console.log("Destroying connection");
            await BaseDatabase.connection.destroy();
            BaseDatabase.connection = null;
        }
    }

    public async startTransaction(): Promise<Knex.Transaction> {
        return this.getConnection().transaction();
    }
}