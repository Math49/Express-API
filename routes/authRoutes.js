import express from 'express';
const router = express.Router();
// import { requireAuth, requireRole } from '../server/auth.js';


router.get('/login', (req, res) => {
    res.render('auth/login', { title: 'Connexion', user: req.user });
});



export default router;