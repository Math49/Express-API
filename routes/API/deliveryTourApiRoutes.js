import express from 'express';
import deliveryTour from '../../App/controllers/deliveryTourController';

const router = express.Router();

router.post('/delivery-tours', deliveryTour.createDeliveryTour);
router.get('/delivery-tours', deliveryTour.getAllDeliveryTours);
router.get('/delivery-tours/:id', deliveryTour.getDeliveryTour);
router.put('/delivery-tours/:id', deliveryTour.updateDeliveryTour);
router.delete('/delivery-tours/:id', deliveryTour.deleteDeliveryTour);

export default router;