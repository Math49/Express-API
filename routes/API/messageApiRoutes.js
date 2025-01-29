import express from 'express';
import message from '../../App/controllers/messageController';

const router = express.Router();

router.post('/messages', message.createMessage);
router.get('/messages', message.getAllMessages);
router.get('/messages/:id', message.getMessages);
router.put('/messages/:id', message.updateMessage);
router.delete('/messages/:id', message.deleteMessage);

export default router;