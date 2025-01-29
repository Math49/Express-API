import express from 'express';
import authControler from '../../App/controllers/authController';

const router = express.Router();

router.post('/login', authControler.login);
router.post('/logout', authControler.logout);

export default router;