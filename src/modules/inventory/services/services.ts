import { InventoryRepository } from "../repositories/repositories"

type ItemType = {
    quantity: number;
    validTill: number | null;
}
const inventoryRepository = new InventoryRepository();

export const addInventory = async (data: { item: string; quantity: number; expiry: Date; }) => {
    return inventoryRepository.addItem(data);
}

export const sellInventory = async (itemName: string, quantity: number) => {

    const item = await inventoryRepository.getByName(itemName);
    if (item.length) {
        const check = item.reduce((pre, cur) => {
            return {
                ...cur,
                quantity: pre.quantity + cur.quantity
            }
        }).quantity >= quantity;
        if (check) {
            let i = 0, quan = quantity;
            let idsArr = [], updateItem: { id?: number, quantity?: number } = {};
            while (quan > 0) {
                if ((item[i].quantity - quan) > 0) {
                    updateItem.id = item[i].id;
                    updateItem.quantity = item[i].quantity - quan;
                    break;
                } else {
                    quan -= item[i].quantity;
                    idsArr.push(item[i].id);
                    i++;
                }
            }
            if (idsArr.length) {
                await inventoryRepository.deleteItem(idsArr);
            }
            if (updateItem.id && updateItem.quantity) {
                await inventoryRepository.updateItemQuantity(updateItem);
            }
        } else {
            throw new Error('Not enough quantity');
        }
    } else {
        throw new Error('Item not found');
    }
    return true;
}


export const getInventory = async (item: string) => {
    const itemsArr = await inventoryRepository.getByName(item);
    if (!itemsArr.length) {
        return {
            quantity: 0,
            validTill: null,
        };
    };

    const _item = itemsArr.reduce((pre, cur) => {
        return {
            ...cur,
            quantity: pre.quantity + cur.quantity,
        }
    });
    return { quantity: _item.quantity, validTill: new Date(_item.expiry).getTime() };
}

export const deleteExpiredItems = async () => {
    const date = new Date();
    return inventoryRepository.deleteByTime(date);
}