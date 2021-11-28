"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const mockConnection_1 = __importDefault(require("../../../tests/mockConnection"));
const inventoryService = __importStar(require("./services"));
describe('InventoryService', () => {
    let connection;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        connection = yield mockConnection_1.default.create();
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mockConnection_1.default.clear();
        yield mockConnection_1.default.close();
    }));
    const date = new Date().getTime() + 1000 * 60 * 60 * 24 * 7;
    test('should create item in inventory', () => __awaiter(void 0, void 0, void 0, function* () {
        const data = {
            item: 'Test Item',
            quantity: 10,
            expiry: new Date(date),
        };
        const obj = yield inventoryService.addInventory(data);
        expect(obj).toBeDefined();
        expect(obj.item).toBe(data.item);
        expect(obj.quantity).toBe(data.quantity);
        expect(obj.expiry).toBe(data.expiry);
    }));
    test('should sell item from inventory', () => __awaiter(void 0, void 0, void 0, function* () {
        const data = {
            item: 'Test Item',
            quantity: 5,
        };
        const resp = yield inventoryService.sellInventory(data.item, data.quantity);
        expect(resp).toBe(true);
    }));
    test('should throw error of not enough quantity on sell item', () => __awaiter(void 0, void 0, void 0, function* () {
        const data = {
            item: 'Test Item',
            quantity: 15,
        };
        const resp = inventoryService.sellInventory(data.item, data.quantity);
        yield expect(resp).rejects.toThrow(/Not enough quantity/);
    }));
    test('should throw error of item not found on sell item', () => __awaiter(void 0, void 0, void 0, function* () {
        const data = {
            item: 'Test',
            quantity: 1,
        };
        const resp = inventoryService.sellInventory(data.item, data.quantity);
        yield expect(resp).rejects.toThrow(/Item not found/);
    }));
    test('should get quantity and latest expiry of item from inventory', () => __awaiter(void 0, void 0, void 0, function* () {
        const obj = yield inventoryService.getInventory('Test Item');
        expect(obj).toBeDefined();
        expect(obj.quantity).toBe(5);
        expect(obj.validTill).toBe(date);
    }));
    test('should get quantity 0 and expiry null of item from inventory', () => __awaiter(void 0, void 0, void 0, function* () {
        const obj = yield inventoryService.getInventory('Test');
        expect(obj).toBeDefined();
        expect(obj.quantity).toBe(0);
        expect(obj.validTill).toBe(null);
    }));
    test('should delete expire items from db', () => __awaiter(void 0, void 0, void 0, function* () {
        const obj = yield inventoryService.deleteExpiredItems();
        console.log(obj);
        expect(obj).toBeDefined();
        // expect(obj).toBe(true);
    }));
});
//# sourceMappingURL=services.spec.js.map