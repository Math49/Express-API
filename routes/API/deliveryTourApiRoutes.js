import express from 'express';
import Livraisons from '../../App/Models/Logistique/Livraisons.js';

const router = express.Router();

// POST - /delivery-tours
router.post('/delivery-tours', async (req, res) => {
    try {

        const ID_Commande = req.body.ID_Commande;
        const ID_Livreur = req.body.ID_Livreur;
        const ID_RespLogi = req.body.ID_RespLogi;

        const deliveryTour = await Livraisons.create({
            ID_Commande,
            ID_Livreur,
            ID_RespLogi,
        });
        res.status(201).json(deliveryTour);
    } catch (error) {
        console.error('Erreur lors de la création de la tournée de livraison :', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

// GET - /delivery-tours
router.get('/delivery-tours', async (req, res) => {
    try {
        const deliveryTours = await Livraisons.findAll();
        res.status(200).json(deliveryTours);
    } catch (error) {
        console.error('Erreur lors de la récupération des tournées de livraison :', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

// GET - /delivery-tours/:id
router.get('/delivery-tours/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deliveryTour = await Livraisons.findByPk(id);
        if (!deliveryTour) {
            return res.status(404).json({ error: 'Tournée de livraison non trouvée' });
        }
        res.status(200).json(deliveryTour);
    } catch (error) {
        console.error('Erreur lors de la récupération de la tournée de livraison :', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

// PUT - /delivery-tours/:id
router.put('/delivery-tours/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deliveryTour = await Livraisons.findByPk(id);
        if (!deliveryTour) {
            return res.status(404).json({ error: 'Tournée de livraison non trouvée' });
        }
        await deliveryTour.update(req.body);
        res.status(200).json(deliveryTour);
    } catch (error) {
        console.error('Erreur lors de la mise à jour de la tournée de livraison :', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

// DELETE - /delivery-tours/:id
router.delete('/delivery-tours/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deliveryTour = await Livraisons.findByPk(id);
        if (!deliveryTour) {
            return res.status(404).json({ error: 'Tournée de livraison non trouvée' });
        }
        await deliveryTour.destroy();
        res.status(200).json({ message: 'Tournée de livraison supprimée avec succès' });
    } catch (error) {
        console.error('Erreur lors de la suppression de la tournée de livraison :', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

export default router;