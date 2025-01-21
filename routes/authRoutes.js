import express from 'express';
const router = express.Router();
// import { requireAuth, requireRole } from '../server/auth.js';


router.get('/login', (req, res) => {
    res.render('auth/login', { title: 'Connexion', user: req.user });
});

router.get('/logout', (req, res) => {
    res.clearCookie('auth_token');
    res.redirect('/');
});

export default router;