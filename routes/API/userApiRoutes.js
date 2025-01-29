import express from 'express';
import Comptes from '../../App/Models/Utilisateurs/Comptes.js';
import { Administrateur, Client, Commercial, Fournisseur, Livreur, ResponsableLogistique } from '../../App/Models/Utilisateurs/Roles.js';

const router = express.Router();

// POST - /users
router.post('/users', async (req, res) => {
    try {

        const user = await Comptes.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        console.error('Erreur lors de la création de l\'utilisateur :', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

// GET - /users
router.get('/users', async (req, res) => {
    try {
        const users = await Comptes.findAll();
        
        for (const user of users) {
            const roles = [
                { model: Administrateur, role: 'Administrateur' },
                { model: Client, role: 'Client' },
                { model: Commercial, role: 'Commercial' },
                { model: Fournisseur, role: 'Fournisseur' },
                { model: Livreur, role: 'Livreur' },
                { model: ResponsableLogistique, role: 'Responsable_Logistique' },
            ];
    
            let foundRole = null;
            for (const { model, role } of roles) {
                const result = await model.findOne({ where: { ID_Compte: user.ID_Compte } });
                if (result) {
                    foundRole = role;
                    break;
                }
            }
            user.role = foundRole;
        }


        res.status(200).json(users);
    } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs :', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

// GET - /users/role/:role
router.get('/users/role/:role', async (req, res) => {
    const { role } = req.params;
    try {
        const userRoles = [];
        switch (role) {
            case 'Administrateur':
                userRoles = await Administrateur.findAll();
                break;
            case 'Client':
                userRoles = await Client.findAll();
                break;
            case 'Commercial':
                userRoles = await Commercial.findAll();
                break;
            case 'Fournisseur':
                userRoles = await Fournisseur.findAll();
                break;
            case 'Livreur':
                userRoles = await Livreur.findAll();
                break;
            case 'Responsable_Logistique':
                userRoles = await ResponsableLogistique.findAll();
                break;
        }

        const users = [];

        for (const userRole of userRoles) {
            const user = await Comptes.findByPk(userRole.ID_Compte);
            user.role = role;
            users.push(user);
        }

        res.status(200).json(users);
    } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs par rôle :', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

// GET - /users/:id
router.get('/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await Comptes.findByPk(id);

        const roles = [
            { model: Administrateur, role: 'Administrateur' },
            { model: Client, role: 'Client' },
            { model: Commercial, role: 'Commercial' },
            { model: Fournisseur, role: 'Fournisseur' },
            { model: Livreur, role: 'Livreur' },
            { model: ResponsableLogistique, role: 'Responsable_Logistique' },
        ];

        let foundRole = null;
        for (const { model, role } of roles) {
            const result = await model.findOne({ where: { ID_Compte: user.ID_Compte } });
            if (result) {
                foundRole = role;
                break;
            }
        }
        
        user.dataValues.Password = "t'y a crue hein !";

        user.dataValues.Role = foundRole;

        if (!user) {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'utilisateur :', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

// PUT - /users/:id
router.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    try {

        const email = req.body.Email;
        const nom = req.body.Nom;
        const prenom = req.body.Prenom;
        const role = req.body.Role;

        const user = await Comptes.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }
        await user.update({
            Email: email,
            Nom: nom,
            Prenom: prenom
        });

        const roles = [
            { model: Administrateur, role: 'Administrateur' },
            { model: Client, role: 'Client' },
            { model: Commercial, role: 'Commercial' },
            { model: Fournisseur, role: 'Fournisseur' },
            { model: Livreur, role: 'Livreur' },
            { model: ResponsableLogistique, role: 'Responsable_Logistique' },
        ];

        for (const { model, role: roleName } of roles) {
            const result = await model.findOne({ where: { ID_Compte: user.ID_Compte } });
            if (result) {
                if (roleName === role) {
                    break;
                }
                else {
                    await result.destroy();
                }
            }

            if (roleName === role) {
                if (roleName === 'Client'){
                    
                }
            }
        }

        // faire ce nécessaire pour les spécificités de chaque rôle


        res.status(200).json(user);
    } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'utilisateur :', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

// DELETE - /users/:id
router.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await Comptes.findByPk(id);

        const roles = [
            { model: Administrateur, role: 'Administrateur' },
            { model: Client, role: 'Client' },
            { model: Commercial, role: 'Commercial' },
            { model: Fournisseur, role: 'Fournisseur' },
            { model: Livreur, role: 'Livreur' },
            { model: ResponsableLogistique, role: 'Responsable_Logistique' },
        ];

        for (const { model, role } of roles) {
            const result = await model.findOne({ where: { ID_Compte: user.ID_Compte } });
            if (result) {
                await result.destroy();
                break;
            }
        }

        if (!user) {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }
        await user.destroy();
        res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'utilisateur :', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

export default router;