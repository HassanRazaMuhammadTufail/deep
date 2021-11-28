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
exports.CreateInventoryTable1637168916212 = void 0;
const typeorm_1 = require("typeorm");
class CreateInventoryTable1637168916212 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield queryRunner.createTable(new typeorm_1.Table({
                name: 'inventories',
                columns: [
                    {
                        name: 'id',
                        type: 'integer',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'item',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'quantity',
                        type: 'integer',
                        isNullable: false,
                    },
                    {
                        name: 'expiry',
                        type: 'timestamp',
                        isNullable: false,
                    },
                ],
            }), true);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.CreateInventoryTable1637168916212 = CreateInventoryTable1637168916212;
//# sourceMappingURL=1637168916212-CreateInventoryTable.js.map