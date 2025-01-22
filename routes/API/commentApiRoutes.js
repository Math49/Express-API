import express from 'express';
import Commentaire from '../../App/Models/Boutique/Commentaire.js';
import Comptes from '../../App/Models/Utilisateurs/Comptes.js';
import { requireRole } from '../../server/authServ.js';

const router = express.Router();

// POST - /products/:id/comments
router.post('/products/:id/comments', async (req, res) => {
    const { ID_Produit } = req.params;
    const ID_Compte = req.body.ID_Compte;
    const Contenu = req.body.Contenu;

    try {
        // Vérifiez que toutes les données nécessaires sont fournies
        if (!ID_Produit || !ID_Compte || !Contenu) {
            ID_Produit ? console.log('ID_Produit', ID_Produit) : console.log('ID_Produit manquant');
            ID_Compte ? console.log('ID_Compte', ID_Compte) : console.log('ID_Compte manquant');
            Contenu ? console.log('Commentaire', Contenu) : console.log('Commentaire manquant');
            return res.status(400).json({ error: 'Données manquantes' });
        }

        // Création du commentaire
        const nouveauCommentaire = await Commentaire.create({
            ID_Produit:ID_Produit,
            ID_Compte:ID_Compte,
            Commentaire:Contenu,
        });

        res.status(201).json(nouveauCommentaire);
    } catch (error) {
        console.error('Erreur lors de la création du commentaire :', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

// GET - /products/:id/comments
router.get('/products/:id/comments', async (req, res) => {
    const { id } = req.params;

    try {
        const commentaires = await Commentaire.findAll({ where: { ID_Produit: id } });

        for (const commentaire of commentaires) {
            const user = await Comptes.findOne({ where: { ID_Compte: commentaire.ID_Compte } });
            commentaire.dataValues.user = user ? {
                Nom: user.Nom,
                Prenom: user.Prenom,
            } : null;
        }

        res.status(200).json(commentaires);
    } catch (error) {
        console.error('Erreur lors de la récupération des commentaires :', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

// GET - /products/:id/comments/:commentId
router.get('/products/:id/comments/:commentId', async (req, res) => {
    const { commentId } = req.params;

    try {
        const commentaire = await Commentaire.findByPk(commentId);

        if (!commentaire) {
            return res.status(404).json({ error: 'Commentaire non trouvé' });
        }

        const user = await Comptes.findOne({ where: { ID_Compte: commentaire.ID_Compte } });
        commentaire.dataValues.user = user ? {
            Nom: user.Nom,
            Prenom: user.Prenom,
        } : null;

        res.status(200).json(commentaire);
    } catch (error) {
        console.error('Erreur lors de la récupération du commentaire :', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

// PUT - /products/:id/comments/:commentId
router.put('/products/:id/comments/:commentId', async (req, res) => {
    const { commentId } = req.params;

    try {
        const commentaire = await Commentaire.findByPk(commentId);

        if (!commentaire) {
            return res.status(404).json({ error: 'Commentaire non trouvé' });
        }

        await commentaire.update(req.body);
        res.status(200).json(commentaire);
    } catch (error) {
        console.error('Erreur lors de la mise à jour du commentaire :', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

// DELETE - /products/:id/comments/:commentId
router.delete('/products/:id/comments/:commentId', requireRole(['Administrateur']), async (req, res) => {
    const { commentId } = req.params;

    try {
        const commentaire = await Commentaire.findByPk(commentId);

        if (!commentaire) {
            return res.status(404).json({ error: 'Commentaire non trouvé' });
        }

        await commentaire.destroy();
        res.status(200).json({ message: 'Commentaire supprimé avec succès' });
    } catch (error) {
        console.error('Erreur lors de la suppression du commentaire :', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

export default router;