import express from 'express';
import Demande_Affectation from '../../App/Models/Logistique/Demande_Affectation.js';
import { Fournisseur } from '../../App/Models/Utilisateurs/Roles.js';

const router = express.Router();

// POST - /assignment-requests
router.post('/assignment-requests', async (req, res) => {
    try {

        const ID_Fournisseur = req.body.ID_Fournisseur;
        const ID_Commercial = req.body.ID_Commercial;


        const request = await Demande_Affectation.create({
            ID_Fournisseur,
            ID_Commercial,
        });
        res.status(201).json(request);
    } catch (error) {
        console.error('Erreur lors de la création de la demande d\'affectation :', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

// GET - /assignment-requests
router.get('/assignment-requests', async (req, res) => {
    try {
        const requests = await Demande_Affectation.findAll();
        res.status(200).json(requests);
    } catch (error) {
        console.error('Erreur lors de la récupération des demandes d\'affectation :', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

// GET - /assignment-requests/:id
router.get('/assignment-requests/:id_Commercial/:id_Fournisseur', async (req, res) => {
    try {
        const ID_Fournisseur = req.params.id_Fournisseur;
        const ID_Commercial = req.params.id_Commercial;

        const request = await Demande_Affectation.findOne({
            where: {
                ID_Fournisseur:ID_Fournisseur,
                ID_Commercial:ID_Commercial,
            }
        });
        if (!request) {
            return res.status(404).json({ error: 'Demande d\'affectation non trouvée' });
        }
        res.status(200).json(request);
    } catch (error) {
        console.error('Erreur lors de la récupération de la demande d\'affectation :', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

// PUT - /assignment-requests/:id
router.put('/assignment-requests/:id_Commercial/:id_Fournisseur', async (req, res) => {
    const ID_Fournisseur = req.params.id_Fournisseur;
    const ID_Commercial = req.params.id_Commercial;
    try {
        const request = await Demande_Affectation.findOne({
            where: {
                ID_Fournisseur:ID_Fournisseur,
                ID_Commercial:ID_Commercial,
            }
        });

        if (!request) {
            return res.status(404).json({ error: 'Demande d\'affectation non trouvée' });
        }
        await request.update({
            ID_Fournisseur: req.body.ID_Fournisseur,
            ID_Commercial: req.body.ID_Commercial,
        });
        res.status(200).json(request);
    } catch (error) {
        console.error('Erreur lors de la mise à jour de la demande d\'affectation :', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

// DELETE - /assignment-requests
router.delete('/assignment-requests', async (req, res) => {
    try {

        const ID_Fournisseur = req.body.ID_Fournisseur;
        const ID_Commercial = req.body.ID_Commercial;

        const request = await Demande_Affectation.findOne({
            where: {
                ID_Fournisseur:ID_Fournisseur,
                ID_Commercial:ID_Commercial,
            }
        });
        if (!request) {
            return res.status(404).json({ error: 'Demande d\'affectation non trouvée' });
        }
        await request.destroy();
        res.status(200).json({ message: 'Demande d\'affectation supprimée avec succès' });
    } catch (error) {
        console.error('Erreur lors de la suppression de la demande d\'affectation :', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});


router.put('/accept-assignment-requests/:id_Commercial/:id_Fournisseur', async (req, res) => {

    const ID_Fournisseur = req.params.id_Fournisseur;
    const ID_Commercial = req.params.id_Commercial;

    try {
    
        const request = await Demande_Affectation.findOne({
            where: {
                ID_Fournisseur:ID_Fournisseur,
                ID_Commercial:ID_Commercial,
            }
        });

        if (!request) {
            return res.status(404).json({ error: 'Demande d\'affectation non trouvée' });
        }
        const rqtFournisseur = await Fournisseur.findOne({
            where: {
                ID_Fournisseur:ID_Fournisseur,
            }
        });
        if (!rqtFournisseur) {
            return res.status(404).json({ error: 'Fournisseur non trouvé' });
        }

        await rqtFournisseur.update({
            ID_Commercial: ID_Commercial,
        });
        await request.destroy();
        res.status(200).json({ message: 'Demande d\'affectation acceptée avec succès' });
    } catch (error) {
        console.error('Erreur lors de l\'acceptation de la demande d\'affectation :', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

export default router;