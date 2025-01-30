import express from 'express';
import deliveryTour from '../../App/controllers/deliveryTourController.js';
import {requireAuth} from '../../server/authServ.js';

const router = express.Router();

router.post('/delivery-tours',requireAuth, deliveryTour.createDeliveryTour);
router.get('/delivery-tours',requireAuth, deliveryTour.getAllDeliveryTours);
router.get('/delivery-tours/:id',requireAuth, deliveryTour.getDeliveryTour);
router.put('/delivery-tours/:id',requireAuth, deliveryTour.updateDeliveryTour);
router.delete('/delivery-tours/:id',requireAuth, deliveryTour.deleteDeliveryTour);

export default router;