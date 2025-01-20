import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    res.render('boutique/boutique', { title: 'Boutique', user: req.user });
});

router.get('/{ID_produit}', (req, res) => {
    res.render('boutique/produitView', { title: 'Produits', user: req.user });
});

export default router;