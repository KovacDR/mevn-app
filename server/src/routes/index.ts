import { Router } from 'express';
import productRoutes from './products.routes';
import app from '../app';

const router = Router();

router.use('/products', productRoutes);

export default router;