import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';

/**
 * @desc    Fetch all Products
 * @route   GET /api/products
 * @access  Public
 */
const getProducts = asyncHandler(async (req, res) => {
	const products = await Product.find({});
	res.json({ data: products });
});

/**
 * @desc    Fetch Product by ID
 * @route   GET /api/products/:id
 * @access  Public
 */
const getProductsByID = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);

	if (product) {
		return res.json({ data: product });
	}
	res.status(404).json({ message: 'Product not found' });
});

export { getProducts, getProductsByID };
