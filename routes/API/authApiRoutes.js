import express from 'express';
import auth from '../../App/controllers/authController.js';

const router = express.Router();

router.post('/login', auth.login);
router.post('/logout', auth.logout);

export default router;