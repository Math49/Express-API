import express from 'express';
const router = express.Router();


router.get('/', (req, res) => {
    res.render('boutique/boutique', { title: 'Boutique', user: req.user });
});

router.get('/panier', (req, res) => {
    res.render('boutique/panier', { title: 'Panier', user: req.user });
});

router.get('/:ID_Produit', async (req, res) => {
    res.render('boutique/produitView', { user: req.user });
});



export default router;