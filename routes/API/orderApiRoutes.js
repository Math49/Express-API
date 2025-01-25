import express from 'express';
import Commandes from '../../App/Models/Logistique/Commandes.js';
import Article from '../../App/Models/Boutique/Article.js';

const router = express.Router();

// POST - /orders
router.post('/orders', async (req, res) => {
    try {

        const produits = req.body.produits;
        const ID_Client = req.body.ID_Client;
        const status = "En attente";

        const num_Commande = Math.floor(Math.random() * 1000000);
        const now = new Date();
        const date = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ` +
                     `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}.000`;

        // pb de date

        const ID_Livraison = 0;

        const volume = 0;
        let Prix = 0;

        for (const produit of produits) {
            Prix += produit.Prix_HT * produit.quantity;
        }

        const order = await Commandes.create({
            Num_Commande: num_Commande,
            Volume: volume,
            Prix_Paye: Prix,
            ID_Client: ID_Client,
            ID_Livraison: ID_Livraison,
            Status: status,
            Date_Commande: date
        });

        console.log(order);

        for (const produit of produits) {
            await Article.create({
                ID_Produit: produit.ID_Produit,
                ID_Commande: order.ID_Commande,
                Quantite: produit.quantity,
                Prix: produit.Prix_HT
            });
        }

        res.status(201).json(order);
    } catch (error) {
        console.error('Erreur lors de la création de la commande :', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

// GET - /orders
router.get('/orders', async (req, res) => {
    try {
        const orders = await Commandes.findAll();

        for (const order of orders) {
            const articles = await Article.findAll({where: {ID_Commande: order.ID_Commande}});
            order.dataValues.articles = articles;
        }

        res.status(200).json(orders);
    } catch (error) {
        console.error('Erreur lors de la récupération des commandes :', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

// GET - /orders/:id
router.get('/orders/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const order = await Commandes.findByPk(id);

        const articles = await Article.findAll({where: {ID_Commande: order.ID_Commande}});
        order.dataValues.articles = articles;

        if (!order) {
            return res.status(404).json({ error: 'Commande non trouvée' });
        }
        res.status(200).json(order);
    } catch (error) {
        console.error('Erreur lors de la récupération de la commande :', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

// PUT - /orders/:id
router.put('/orders/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const order = await Commandes.findByPk(id);
        const articlesAll = await Article.findAll({where: {ID_Commande: order.ID_Commande}});
        if (!order) {
            return res.status(404).json({ error: 'Commande non trouvée' });
        }
        await order.update({
            num_Commande: req.body.num_Commande,
            ID_Client: req.body.ID_Client,
            Volume: req.body.Volume,
            Prix_Paye: req.body.Prix,
            ID_Livraison: req.body.ID_Livraison,
        });

        const articles = req.body.articles;

        for (const article of articlesAll) {
            if (!articles.some(a => a.ID_Article === article.ID_Article)) {
                await article.destroy();
            }
        }

        res.status(200).json(order);
    } catch (error) {
        console.error('Erreur lors de la mise à jour de la commande :', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

// DELETE - /orders/:id
router.delete('/orders/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const order = await Commandes.findByPk(id);

        const articles = await Article.findAll({where: {ID_Commande: order.ID_Commande}});

        if (!order) {
            return res.status(404).json({ error: 'Commande non trouvée' });
        }
        
        for (const article of articles) {
            await article.destroy();
        }
        await order.destroy();
        res.status(200).json({ message: 'Commande supprimée avec succès' });
    } catch (error) {
        console.error('Erreur lors de la suppression de la commande :', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

router.post('/articles', async (req, res) => {
    try {
        const ID_Commande = req.body.ID_Commande;
        const ID_Produit = req.body.ID_Produit;
        const Quantite = req.body.Quantite;
        const Prix = req.body.Prix;

        const article = await Article.create({
            ID_Produit,
            ID_Commande,
            Quantite,
            Prix
        });
        res.status(201).json(article);
    } catch (error) {
        console.error('Erreur lors de la création de l\'article :', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

export default router;