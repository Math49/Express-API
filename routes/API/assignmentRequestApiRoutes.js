import express from 'express';
import assignmentRequest from '../../App/controllers/assignmentRequestController.js';
import {requireAuth} from '../../server/authServ.js';

const router = express.Router();

router.post('/assignment-requests',requireAuth, assignmentRequest.createRequest);
router.get('/assignment-requests',requireAuth, assignmentRequest.getAllRequests);
router.get('/assignment-requests/:id_Commercial/:id_Fournisseur',requireAuth, assignmentRequest.getRequest);
router.put('/assignment-requests/:id_Commercial/:id_Fournisseur',requireAuth, assignmentRequest.updateRequest);
router.delete('/assignment-requests',requireAuth, assignmentRequest.deleteRequest);
router.put('/accept-assignment-requests/:id_Commercial/:id_Fournisseur',requireAuth, assignmentRequest.acceptRequest);

export default router;