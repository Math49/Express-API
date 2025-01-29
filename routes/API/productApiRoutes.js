import express from 'express';
import product from '../../App/controllers/productController';

const router = express.Router();

router.post('/products', product.createProduct);
router.get('/products', product.getAllProducts);
router.get('/products/:id', product.getProduct);
router.put('/products/:id', product.updateProduct);
router.delete('/products/:id', product.deleteProduct);

export default router;