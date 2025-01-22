import express from 'express';
import Commandes from '../../App/Models/Logistique/Commandes.js';
import Article from '../../App/Models/Boutique/Article.js';
import { or } from 'sequelize';

const router = express.Router();

// POST - /orders
router.post('/orders', async (req, res) => {
    try {

        const num_Commande = req.body.num_Commande;
        const ID_Client = req.body.ID_Client;
        const Volume = req.body.Volume;
        const Prix = req.body.Prix;
        const ID_Livraison = req.body.ID_Livraison;
        const status = "En attente";
        const date = req.body.date;

        const order = await Commandes.create({
            num_Commande,
            Volume,
            Prix,
            ID_Client,
            ID_Livraison,
            status,
            date
        });
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

        for (order of orders) {
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
        if (!order) {
            return res.status(404).json({ error: 'Commande non trouvée' });
        }
        await order.update(req.body);
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
        
        for (article of articles) {
            await article.destroy();
        }
        await order.destroy();
        res.status(200).json({ message: 'Commande supprimée avec succès' });
    } catch (error) {
        console.error('Erreur lors de la suppression de la commande :', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

export default router;