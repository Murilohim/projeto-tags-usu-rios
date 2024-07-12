import { BaseDatabase } from "../BaseDatabase";

export class TableMigrations extends BaseDatabase {

    async createTable(tableName: string, tableSchema: string): Promise<void> {
        try {
            await this.getConnection().raw(`
                CREATE TABLE IF NOT EXISTS ${tableName} (
                    ${tableSchema}
                )
            `);

            console.log(`Table '${tableName}' created successfully`);
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    async createAllTables(): Promise<void> {
        try {
            await this.createTable('clients', `
                id VARCHAR(255) PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL UNIQUE
            `);

            await this.createTable('tags', `
                id VARCHAR(255) PRIMARY KEY,
                name VARCHAR(255) NOT NULL UNIQUE
            `);

            await this.createTable('client_tags', `
                client_id VARCHAR(255),
                tag_id VARCHAR(255),
                PRIMARY KEY (client_id, tag_id),
                FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE,
                FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
            `);

            console.log("All tables created successfully");
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

}

async function runMigrations() {
    const tableMigrations = new TableMigrations();
    try {
        await tableMigrations.createAllTables();
    } catch (error: any) {
        console.error(error.message || error.sqlMessage);
    } finally {
        await tableMigrations.destroyConnection();
    }
}

runMigrations();