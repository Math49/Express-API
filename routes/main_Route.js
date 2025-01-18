import express from 'express';
const router = express.Router();
// import { requireAuth, requireRole } from '../server/auth.js';



router.get('/', (req, res) => {
    res.render('index', { title: 'Accueil', user: req.user });
});



export default router;