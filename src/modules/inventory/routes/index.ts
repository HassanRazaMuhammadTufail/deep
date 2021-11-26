import { Router } from 'express';
import * as InventoryController from '../controllers/controllers';

const router = Router();

router.get('/:item/quantity', InventoryController.getInventory);
router.post('/:item/add', InventoryController.addInventory);
router.post('/:item/sell', InventoryController.sellInventory);

export default router;