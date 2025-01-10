import express from 'express';
const router = express.Router();
import { requireAuth, requireRole } from '../server/auth.js';


// Route principale
router.get('/', (req, res) => {
    res.render('index', { title: 'Accueil', user: req.user });
});

// Exemple de route supplémentaire
router.get('/about', (req, res) => {
    res.render('about', { title: 'À propos', user: req.user });
});

router.get('/tchat', requireAuth, (req, res) => {
    res.render('tchat', { title: 'tchat', user: req.user });
});

export default router;