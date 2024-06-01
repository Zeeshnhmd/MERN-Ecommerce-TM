import express from 'express';
import cors from 'cors';

import { config } from './config/config.js';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { errorHandler, notFound } from './middleware/errormiddleware.js';

const app = express();

// Body Parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

const port = config.port || 4000;

connectDB();

app.get('/', (req, res) => res.json({ message: 'Welcome to ecommerce API' }));

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port: ${port}`));
