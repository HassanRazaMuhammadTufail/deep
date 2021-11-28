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
exports.InventoryRepository = void 0;
const typeorm_1 = require("typeorm");
const inventory_1 = require("../../../entities/inventory");
class InventoryRepository {
    addItem(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const inventory = (0, typeorm_1.getRepository)(inventory_1.Inventory);
            data.expiry = new Date(data.expiry);
            const item = inventory.create(data);
            return inventory.save(item);
        });
    }
    updateItemQuantity({ id, quantity }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id || !quantity)
                throw new Error('Item cannot be updated');
            const inventory = (0, typeorm_1.getRepository)(inventory_1.Inventory);
            return inventory.createQueryBuilder().update(inventory_1.Inventory).set({ quantity }).where('id = :id', { id }).execute();
        });
    }
    deleteItem(idsArr) {
        return __awaiter(this, void 0, void 0, function* () {
            const inventory = (0, typeorm_1.getRepository)(inventory_1.Inventory);
            return inventory.delete(idsArr);
        });
    }
    getByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const inventory = (0, typeorm_1.getRepository)(inventory_1.Inventory);
            let timestamp = new Date();
            const items = yield inventory.find({
                where: { item: name, expiry: (0, typeorm_1.MoreThan)(timestamp) },
                order: { expiry: 'ASC' },
            });
            return items;
        });
    }
    deleteByTime(time) {
        return __awaiter(this, void 0, void 0, function* () {
            const inventory = (0, typeorm_1.getRepository)(inventory_1.Inventory);
            return inventory.delete({ expiry: (0, typeorm_1.LessThan)(time) });
        });
    }
}
exports.InventoryRepository = InventoryRepository;
//# sourceMappingURL=repositories.js.map