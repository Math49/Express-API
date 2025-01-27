import express from 'express';
import { authenticateUser, generateToken } from '../../server/authServ.js';
import { sequelize } from '../../server/dbConnectServ.js';

const router = express.Router();

router.post('/login', (req, res) => {
    
    authenticateUser(req.body.email, req.body.password)
        .then(user => {
            if (!user) {
                res.status(401).json({ success: false, message: 'Identifiants incorrects' });
                return;
            }

            const token = generateToken(user);
            res.cookie('auth_token', token, { httpOnly: true, maxAge: 3600000 });
            res.status(200).json({ success: true, message: 'Connexion réussie', user });
        })
        .catch(err => {
            console.error('Erreur lors de la connexion :', err);
            res.status(500).json({ success: false, message: 'Erreur lors de la connexion' });
        });
    }
);

router.post('/logout', (req, res) => {
    res.clearCookie('auth_token');
    res.status(200).json({ success: true, message: 'Déconnexion réussie' });
});


export default router;