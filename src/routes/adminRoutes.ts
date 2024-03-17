import express from 'express';

import * as groceryController from '../controllers/groceryController';
import validateApiKey from '../utility/ValidateApiKey';

const router = express.Router();
router.post('/add-item', validateApiKey("admin") ,groceryController.addGroceryItem);
router.get('/view-items',  validateApiKey("admin"),groceryController.viewGroceryItems);
router.delete('/remove-item/:id',  validateApiKey("admin"), groceryController.removeGroceryItem);
router.put('/update-item/:id',  validateApiKey("admin"), groceryController.updateGroceryItem);
export default router;
