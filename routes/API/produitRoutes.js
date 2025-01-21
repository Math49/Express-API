import express from 'express';
import Produits from '../../app/Models/Boutique/Produits.js';
import Commentaire from '../../app/Models/Boutique/Commentaire.js';
import Comptes from '../../App/Models/Utilisateurs/Comptes.js';

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
        const commentaires = await Commentaire.findAll({ where: { ID_Produit: ID_Produit } });


        // Ajouter les informations des utilisateurs aux commentaires
        for (const commentaire of commentaires) {
            const user = await Comptes.findOne({ where: { ID_Compte: commentaire.ID_Compte } });
            commentaire.dataValues.user = user ? {
                Nom: user.Nom,
                Prenom: user.Prenom,
            } : null;
        }
        
        produit.dataValues.commentaires = commentaires;
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

router.post('/produits/:ID_Produit/commentaires', async (req, res) => {
    const { ID_Produit } = req.params;
    const ID_Compte = req.body.ID_Compte;
    const Contenu = req.body.Contenu;

    console.log(req.body);

    console.log('ID_Produit', ID_Produit);
    console.log('ID_Compte', ID_Compte);
    console.log('Contenu', Contenu);

    try {
        // Vérifiez que toutes les données nécessaires sont fournies
        if (!ID_Produit || !ID_Compte || !Contenu) {
            console.log('Données manquantes');
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


export default router;
