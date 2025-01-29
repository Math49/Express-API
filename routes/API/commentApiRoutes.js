import express from 'express';
import { requireRole } from '../../server/authServ.js';
import comment from '../../App/controllers/commentController.js';

const router = express.Router();

router.post('/products/:id/comments', comment.createComment);
router.get('/products/:id/comments', comment.getAllComments);
router.get('/products/:id/comments/:commentId', comment.getComment);
router.put('/products/:id/comments/:commentId', comment.updateComment);
router.delete('/products/:id/comments/:commentId', requireRole(['Administrateur']), comment.deleteComment);

export default router;