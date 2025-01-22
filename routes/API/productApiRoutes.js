import express from 'express';
import Produits from '../../App/Models/Boutique/Produits.js';

const router = express.Router();

// POST - /products
router.post('/products', async (req, res) => {
    try {

        const label = req.body.label;
        const marque = req.body.marque;
        const prix = req.body.prix;
        const poids = req.body.poids;
        const description = req.body.description;
        const taxes = 1;

        const product = await Produits.create({
            label,
            marque,
            prix,
            poids,
            description,
            taxes,
        });
        res.status(201).json(product);
    } catch (error) {
        console.error('Erreur lors de la création du produit :', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

// GET - /products
router.get('/products', async (req, res) => {
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

// GET - /products/:id
router.get('/products/:id', async (req, res) => {
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

// PUT - /products/:id
router.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    try {

        const label = req.body.label;
        const marque = req.body.marque;
        const prix = req.body.prix;
        const poids = req.body.poids;
        const description = req.body.description;
        const taxes = 1;

        const product = await Produits.findByPk(id);
        if (!product) {
            return res.status(404).json({ error: 'Produit non trouvé' });
        }
        await product.update({
            label,
            marque,
            prix,
            poids,
            description,
            taxes,
        });
        res.status(200).json(product);
    } catch (error) {
        console.error('Erreur lors de la mise à jour du produit :', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

// DELETE - /products/:id
router.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Produits.findByPk(id);
        if (!product) {
            return res.status(404).json({ error: 'Produit non trouvé' });
        }
        await product.destroy();
        res.status(200).json({ message: 'Produit supprimé avec succès' });
    } catch (error) {
        console.error('Erreur lors de la suppression du produit :', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

export default router;