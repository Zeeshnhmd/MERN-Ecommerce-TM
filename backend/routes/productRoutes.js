import express from 'express';

import {
	getProducts,
	getProductsByID,
} from '../controllers/productController.js';

const router = express.Router();

router.get('/', getProducts);

router.get('/:id', getProductsByID);

export default router;
