import mockConnection from "../../../tests/mockConnection";
import * as inventoryService from "./services";
describe("InventoryService", () => {

    let connection;

    beforeAll(async () => {
        connection = await mockConnection.create();
    });

    afterAll(async () => {
        await mockConnection.clear();
        await mockConnection.close();
    });
    const date = new Date().getTime() + (1000 * 60 * 60 * 24 * 7);
    test('should create item in inventory', async () => {

        const data = {
            item: "Test Item",
            quantity: 10,
            expiry: new Date(date),
        };
        const obj = await inventoryService.addInventory(data);
        expect(obj).toBeDefined();
        expect(obj.item).toBe(data.item);
        expect(obj.quantity).toBe(data.quantity);
        expect(obj.expiry).toBe(data.expiry);
    });

    test('should sell item from inventory', async () => {
        const data = {
            item: "Test Item",
            quantity: 5,
        };
        const resp = await inventoryService.sellInventory(data.item, data.quantity);
        expect(resp).toBe(true);
    });

    test('should throw error of not enough quantity on sell item', async () => {
        const data = {
            item: "Test Item",
            quantity: 15,
        };
        const resp = inventoryService.sellInventory(data.item, data.quantity);
        await expect(resp).rejects.toThrow(/Not enough quantity/);
    });

    test('should throw error of item not found on sell item', async () => {
        const data = {
            item: "Test",
            quantity: 1,
        };
        const resp = inventoryService.sellInventory(data.item, data.quantity);
        await expect(resp).rejects.toThrow(/Item not found/);
    });

    test('should get quantity and latest expiry of item from inventory', async () => {
        const obj = await inventoryService.getInventory('Test Item');
        expect(obj).toBeDefined();
        expect(obj.quantity).toBe(5);
        expect(obj.validTill).toBe(date);
    })

    test('should get quantity 0 and expiry null of item from inventory', async () => {
        const obj = await inventoryService.getInventory('Test');
        expect(obj).toBeDefined();
        expect(obj.quantity).toBe(0);
        expect(obj.validTill).toBe(null);
    })

    test('should delete expire items from db', async () => {
        const obj = await inventoryService.deleteExpiredItems();
        console.log(obj)
        expect(obj).toBeDefined();
        // expect(obj).toBe(true);
    })
});
