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
exports.deleteExpiredItems = exports.getInventory = exports.sellInventory = exports.addInventory = void 0;
const repositories_1 = require("../repositories/repositories");
const inventoryRepository = new repositories_1.InventoryRepository();
const addInventory = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return inventoryRepository.addItem(data);
});
exports.addInventory = addInventory;
const sellInventory = (itemName, quantity) => __awaiter(void 0, void 0, void 0, function* () {
    const item = yield inventoryRepository.getByName(itemName);
    if (item.length) {
        const check = item.reduce((pre, cur) => {
            return Object.assign(Object.assign({}, cur), { quantity: pre.quantity + cur.quantity });
        }).quantity >= quantity;
        if (check) {
            let i = 0, quan = quantity;
            let idsArr = [], updateItem = {};
            while (quan > 0) {
                if (item[i].quantity - quan > 0) {
                    updateItem.id = item[i].id;
                    updateItem.quantity = item[i].quantity - quan;
                    break;
                }
                else {
                    quan -= item[i].quantity;
                    idsArr.push(item[i].id);
                    i++;
                }
            }
            if (idsArr.length) {
                yield inventoryRepository.deleteItem(idsArr);
            }
            if (updateItem.id && updateItem.quantity) {
                yield inventoryRepository.updateItemQuantity(updateItem);
            }
        }
        else {
            throw new Error('Not enough quantity');
        }
    }
    else {
        throw new Error('Item not found');
    }
    return true;
});
exports.sellInventory = sellInventory;
const getInventory = (item) => __awaiter(void 0, void 0, void 0, function* () {
    const itemsArr = yield inventoryRepository.getByName(item);
    if (!itemsArr.length) {
        return {
            quantity: 0,
            validTill: null,
        };
    }
    const _item = itemsArr.reduce((pre, cur) => {
        return Object.assign(Object.assign({}, cur), { quantity: pre.quantity + cur.quantity });
    });
    return {
        quantity: _item.quantity,
        validTill: new Date(_item.expiry).getTime(),
    };
});
exports.getInventory = getInventory;
const deleteExpiredItems = () => __awaiter(void 0, void 0, void 0, function* () {
    const date = new Date();
    return inventoryRepository.deleteByTime(date);
});
exports.deleteExpiredItems = deleteExpiredItems;
//# sourceMappingURL=services.js.map