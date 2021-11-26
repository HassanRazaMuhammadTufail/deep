import { createConnection } from "typeorm";
export let connect = async () => {
    return await createConnection({
        "type": "postgres",
        "host": "fanny.db.elephantsql.com",
        "database": "xtsjnnph",
        "username": "xtsjnnph",
        "password": "vIW7rdWq72xxUj2K0OL7xZTL4IPsdXv8",
        "name": "default",
        "synchronize": false,
        "logging": true,
        "entities": [
            __dirname + '/../entities/*.ts'
        ],
        "migrations": [
            __dirname + '/../migrations/**/*.ts'
        ],
        "cli": {
            entitiesDir: __dirname + "/entities/",
            migrationsDir: __dirname + '/migrations/'
        }
    });
};