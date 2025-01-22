import express from 'express';
import Messagerie from '../../App/Models/Logistique/Messagerie.js';

const router = express.Router();

// POST - /messages
router.post('/messages', async (req, res) => {
    try {

        const ID_Fournisseur = req.body.ID_Fournisseur;
        const ID_Commercial = req.body.ID_Commercial;
        const Textmessage = req.body.message;
        const Date = req.body.Date;

        const message = await Messagerie.create({
            ID_Fournisseur,
            ID_Commercial,
            Textmessage,
            Date,
        });
        res.status(201).json(message);
    } catch (error) {
        console.error('Erreur lors de la création du message :', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

// GET - /messages
router.get('/messages', async (req, res) => {
    try {
        const messages = await Messagerie.findAll();
        res.status(200).json(messages);
    } catch (error) {
        console.error('Erreur lors de la récupération des messages :', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

// GET - /messages/:id
router.get('/messages/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const message = await Messagerie.findByPk(id);
        if (!message) {
            return res.status(404).json({ error: 'Message non trouvé' });
        }
        res.status(200).json(message);
    } catch (error) {
        console.error('Erreur lors de la récupération du message :', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

// PUT - /messages/:id
router.put('/messages/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const message = await Messagerie.findByPk(id);
        if (!message) {
            return res.status(404).json({ error: 'Message non trouvé' });
        }
        await message.update(req.body);
        res.status(200).json(message);
    } catch (error) {
        console.error('Erreur lors de la mise à jour du message :', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

// DELETE - /messages/:id
router.delete('/messages/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const message = await Messagerie.findByPk(id);
        if (!message) {
            return res.status(404).json({ error: 'Message non trouvé' });
        }
        await message.destroy();
        res.status(200).json({ message: 'Message supprimé avec succès' });
    } catch (error) {
        console.error('Erreur lors de la suppression du message :', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

export default router;