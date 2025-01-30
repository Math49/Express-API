import express from 'express';
import order from '../../App/controllers/orderController.js';
import {requireAuth} from '../../server/authServ.js';

const router = express.Router();

router.post('/orders',requireAuth, order.createOrder);
router.get('/orders',requireAuth, order.getAllOrders);
router.get('/orders/:id',requireAuth, order.getOrder);
router.put('/orders/:id',requireAuth, order.updateOrder);
router.delete('/orders/:id',requireAuth, order.deleteOrder);
router.post('/articles',requireAuth, order.createArticle);

export default router;