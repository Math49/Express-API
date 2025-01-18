import express from 'express';

const router = express.Router();

// Page 404 : Page non trouvée
router.get('/404', (req, res) => {
    res.status(404).render('error/404', { title: 'Page non trouvée', user: req.user });
});

// Page 401 : Accès non autorisé
router.get('/401', (req, res) => {
    res.status(401).render('error/401', { title: 'Accès non autorisé', user: req.user });
});

// Page 403 : Accès refusé
router.get('/403', (req, res) => {
    res.status(403).render('error/403', { title: 'Accès refusé', user: req.user });
});

//page 500 : Erreur interne du serveur
router.get('/500', (req, res) => {
    res.status(500).render('error/500', { title: 'Erreur interne du serveur', user: req.user });
});

export default router;
