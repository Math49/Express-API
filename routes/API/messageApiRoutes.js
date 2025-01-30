import express from 'express';
import message from '../../App/controllers/messageController.js';
import {requireAuth} from '../../server/authServ.js';

const router = express.Router();

router.post('/messages',requireAuth, message.createMessage);
router.get('/messages',requireAuth, message.getAllMessages);
router.get('/messages/:id',requireAuth, message.getMessages);
router.get('/messages/:id_Fournisseur/:id_Commercial',requireAuth, message.getMessagesRooms);
router.put('/messages/:id',requireAuth, message.updateMessage);
router.delete('/messages/:id',requireAuth, message.deleteMessage);

export default router;