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
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = void 0;
const typeorm_1 = require("typeorm");
let connect = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, typeorm_1.createConnection)({
        type: 'postgres',
        host: 'fanny.db.elephantsql.com',
        database: 'xtsjnnph',
        username: 'xtsjnnph',
        password: 'vIW7rdWq72xxUj2K0OL7xZTL4IPsdXv8',
        name: 'default',
        synchronize: false,
        logging: true,
        entities: [__dirname + '/../entities/*{.ts,.js}'],
        migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
        cli: {
            entitiesDir: __dirname + '/entities/',
            migrationsDir: __dirname + '/migrations/',
        },
    });
});
exports.connect = connect;
//# sourceMappingURL=db.js.map