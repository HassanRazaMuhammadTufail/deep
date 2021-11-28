import { getRepository, LessThan, MoreThan, Repository } from 'typeorm';
import { Inventory } from '../../../entities/inventory';

export class InventoryRepository {
  async addItem(data: { item: string; quantity: number; expiry: Date }): Promise<Inventory> {
    const inventory = getRepository(Inventory);

    data.expiry = new Date(data.expiry);
    const item = inventory.create(data);

    return inventory.save(item);
  }

  async updateItemQuantity({ id, quantity }: { id?: number; quantity?: number }): Promise<object> {
    if (!id || !quantity) throw new Error('Item cannot be updated');

    const inventory = getRepository(Inventory);
    return inventory.createQueryBuilder().update(Inventory).set({ quantity }).where('id = :id', { id }).execute();
  }

  async deleteItem(idsArr: number[]): Promise<any> {
    const inventory = getRepository(Inventory);
    return inventory.delete(idsArr);
  }

  async getByName(name: string): Promise<Inventory[]> {
    const inventory = getRepository(Inventory);
    let timestamp = new Date();
    const items = await inventory.find({
      where: { item: name, expiry: MoreThan(timestamp) },
      order: { expiry: 'ASC' },
    });
    return items;
  }

  async deleteByTime(time: Date): Promise<any> {
    const inventory = getRepository(Inventory);
    return inventory.delete({ expiry: LessThan(time) });
  }
}
