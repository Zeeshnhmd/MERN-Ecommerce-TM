import express from 'express';
import cors from 'cors';

import { config } from './config/config.js';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';

const app = express();

app.use(cors());

const port = config.port || 4000;

connectDB();

app.get('/', (req, res) => res.json({ message: 'Welcome to ecommerce API' }));

app.use('/api/products', productRoutes);

app.listen(port, () => console.log(`Server started on port: ${port}`));
