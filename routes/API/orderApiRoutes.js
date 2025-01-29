import express from 'express';
import order from '../../App/controllers/orderController.js';

const router = express.Router();

router.post('/orders', order.createOrder);
router.get('/orders', order.getAllOrders);
router.get('/orders/:id', order.getOrder);
router.put('/orders/:id', order.updateOrder);
router.delete('/orders/:id', order.deleteOrder);
router.post('/articles', order.createArticle);

export default router;