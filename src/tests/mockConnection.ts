import path from "path";
import { createConnection, getConnection } from "typeorm";

const mockConnection = {
    async create() {
        const entities = path.join(__dirname, "./../entities/*.ts");
        const migrations = path.join(__dirname, "./../migrations/*.ts");
        return createConnection({
            type: "postgres",
            host: "kandula.db.elephantsql.com",
            database: "wakhskke",
            username: "wakhskke",
            password: "cHjB5B6JtaA1WyHeHkjUdXLqYqwiry9w",
            name: "default",
            connectTimeoutMS: 10000,
            synchronize: false,
            dropSchema: false,
            logging: false,
            migrationsRun: true,
            entities: [entities],
            migrations: [migrations],
            cli: {
                entitiesDir: __dirname + "/entities/",
                migrationsDir: __dirname + '/migrations/'
            }
        });
    },

    async close() {
        await getConnection("default").close();
    },

    async clear() {
        const connection = getConnection('default');
        const entities = connection.entityMetadatas;

        await Promise.all(entities.map(async (entity) => {
            const repository = connection.getRepository(entity.name);
            await repository.query(`DELETE FROM ${entity.tableName}`);
        }));
    }
};

export default mockConnection;