import express from 'express';
import message from '../../App/controllers/messageController.js';

const router = express.Router();

router.post('/messages', message.createMessage);
router.get('/messages', message.getAllMessages);
router.get('/messages/:id', message.getMessages);
router.get('/messages/:id_Fournisseur/:id_Commercial', message.getMessagesRooms);
router.put('/messages/:id', message.updateMessage);
router.delete('/messages/:id', message.deleteMessage);

export default router;