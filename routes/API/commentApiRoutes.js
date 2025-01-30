import express from 'express';
import { requireRole } from '../../server/authServ.js';
import comment from '../../App/controllers/commentController.js';
import { requireAuth } from '../../server/authServ.js';

const router = express.Router();

router.post('/products/:id/comments',requireAuth, comment.createComment);
router.get('/products/:id/comments',requireAuth, comment.getAllComments);
router.get('/products/:id/comments/:commentId',requireAuth, comment.getComment);
router.put('/products/:id/comments/:commentId',requireAuth, comment.updateComment);
router.delete('/products/:id/comments/:commentId',requireAuth, requireRole(['Administrateur']), comment.deleteComment);

export default router;