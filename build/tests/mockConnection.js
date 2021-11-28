"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const typeorm_1 = require("typeorm");
const mockConnection = {
    create() {
        return __awaiter(this, void 0, void 0, function* () {
            const entities = path_1.default.join(__dirname, './../entities/*.ts');
            const migrations = path_1.default.join(__dirname, './../migrations/*.ts');
            return (0, typeorm_1.createConnection)({
                type: 'postgres',
                host: 'kandula.db.elephantsql.com',
                database: 'wakhskke',
                username: 'wakhskke',
                password: 'cHjB5B6JtaA1WyHeHkjUdXLqYqwiry9w',
                name: 'default',
                connectTimeoutMS: 10000,
                synchronize: false,
                dropSchema: false,
                logging: false,
                migrationsRun: true,
                entities: [entities],
                migrations: [migrations],
                cli: {
                    entitiesDir: __dirname + '/entities/',
                    migrationsDir: __dirname + '/migrations/',
                },
            });
        });
    },
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, typeorm_1.getConnection)('default').close();
        });
    },
    clear() {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = (0, typeorm_1.getConnection)('default');
            const entities = connection.entityMetadatas;
            yield Promise.all(entities.map((entity) => __awaiter(this, void 0, void 0, function* () {
                const repository = connection.getRepository(entity.name);
                yield repository.query(`DELETE FROM ${entity.tableName}`);
            })));
        });
    },
};
exports.default = mockConnection;
//# sourceMappingURL=mockConnection.js.map