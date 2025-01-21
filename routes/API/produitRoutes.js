import express from 'express';
import Produits from '../../app/Models/Boutique/Produits.js';

const router = express.Router();

// Route pour récupérer tous les produits
router.get('/produits', async (req, res) => {
    try {
        const produits = await Produits.findAll();
        const accept = req.headers.accept;

        if (accept.includes('application/json')) {
            res.status(200).json(produits);
        } else {
            res.status(406).send('Type de contenu non supporté');
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des produits :', error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

router.get('/produits/:ID_Produit', async (req, res) => {
    const { ID_Produit } = req.params;

    try {
        const produit = await Produits.findByPk(ID_Produit);

        if (!produit) {
            return res.status(404).json({ error: 'Produit non trouvé' });
        }

        const accept = req.headers.accept;

        if (accept.includes('application/json')) {
            res.status(200).json(produit);
        } else {
            res.status(406).send('Type de contenu non supporté');
        }
    } catch (error) {
        console.error('Erreur lors de la récupération du produit :', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});



export default router;
