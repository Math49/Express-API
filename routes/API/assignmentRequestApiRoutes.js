import express from 'express';
import assignmentRequest from '../../App/controllers/assignmentRequestController.js';

const router = express.Router();

router.post('/assignment-requests', assignmentRequest.createRequest);
router.get('/assignment-requests', assignmentRequest.getAllRequests);
router.get('/assignment-requests/:id_Commercial/:id_Fournisseur', assignmentRequest.getRequest);
router.put('/assignment-requests/:id_Commercial/:id_Fournisseur', assignmentRequest.updateRequest);
router.delete('/assignment-requests', assignmentRequest.deleteRequest);
router.put('/accept-assignment-requests/:id_Commercial/:id_Fournisseur', assignmentRequest.acceptRequest);

export default router;