import express from 'express';
import cors from 'cors';

import products from './data/products.js';
import { config } from './config/config.js';

const app = express();

app.use(cors());

const port = config.port || 4000;

app.get('/', (req, res) => res.json({ message: 'Welcome to ecommerce API' }));

app.get('/api/products', (req, res) => res.json({ data: products }));

app.get('/api/product/:id', (req, res) => {
	const product = products.find((p) => p._id === req.params.id);

	res.json({ data: product });
});

app.listen(port, () => console.log(`Server started on port: ${port}`));
