import express from 'express';
import product from '../../App/controllers/productController.js';
import {requireAuth} from '../../server/authServ.js';

const router = express.Router();

router.post('/products', product.createProduct);
router.get('/products', product.getAllProducts);
router.get('/products/:id', product.getProduct);
router.put('/products/:id',requireAuth, product.updateProduct);
router.delete('/products/:id',requireAuth, product.deleteProduct);

export default router;