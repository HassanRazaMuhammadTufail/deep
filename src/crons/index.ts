import cron from 'node-cron';
import { deleteExpiredItems } from '../modules/inventory/services/services';

cron.schedule('* * * * *', async () => {
    try {
        await deleteExpiredItems();
        return;
    } catch (error) {
        throw new Error(error);
    }
});