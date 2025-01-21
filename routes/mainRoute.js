import express from 'express';
const router = express.Router();

// import { requireAuth, requireRole } from '../server/auth.js';



router.get('/', (req, res) => {
    res.render('index', { title: 'Accueil', user: req.user });
});

router.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contact', user: req.user });
});

router.post('/contact', (req, res) => {
    const { name, email, message } = req.body;

    console.log(`Message reçu de ${name} (${email}) : ${message}`);

    res.status(200).json({ success: true, message: 'Votre message a été envoyé avec succès !', data : { name, email, message } });
});

export default router;