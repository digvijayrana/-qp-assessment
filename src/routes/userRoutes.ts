import express from 'express';
import * as groceryController from '../controllers/groceryController';
import validateApiKey from '../utility/ValidateApiKey';
const router = express.Router();
router.get('/view-items',  validateApiKey("user"),groceryController.viewAvailableGroceryItems);
router.post('/book-items',  validateApiKey("user"),groceryController.bookGroceryItems);
export default router;
