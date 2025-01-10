import express from 'express';
import { authenticateUser, generateToken, requireAuth, requireRole } from '../server/auth.js';

const router = express.Router();


router.get('/', (req, res) => {
    res.render('auth/login', { user: req.user });
}); 

// Route pour la connexion
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await authenticateUser(email, password);
    console.log(user);
    if (!user) return res.status(401).json({ error: 'Identifiants incorrects' });

    console.log('Utilisateur connecté :', user);

    const token = generateToken(user);

    res.cookie('auth_token', token, { httpOnly: true });
    res.json({ message: 'Connexion réussie', token });
});

router.get('/logout', (req, res) => {
    res.clearCookie('auth_token'); // Supprime le cookie
    res.redirect('/'); // Redirige vers la page d'accueil
});


// Route protégée pour les administrateurs
router.get('/admin', requireAuth, requireRole("Administrateurs"), (req, res) => {
    res.json({ message: 'Bienvenue, administrateur !', user: req.user });
});




export default router;
