import Comptes from '../../App/Models/Utilisateurs/Comptes.js';
import { Administrateur, Client, Commercial, Fournisseur, Livreur, ResponsableLogistique } from '../../App/Models/Utilisateurs/Roles.js';

const user = {

    async createUser(req, res) {
        try {

            const prenom = req.body.Prenom;
            const nom = req.body.Nom;
            const email = req.body.Email;
            const telephone = req.body.Telephone;
            const password = req.body.Password;

            const user = await Comptes.create({
                Prenom: prenom,
                Nom: nom,
                Email: email,
                Telephone: telephone,
                Password: password
            });

            await Client.create({
                ID_Compte: user.ID_Compte,
                Adresse: "0xE6100000010CA2258FA7655C51C0AD1402B9C47C51C0"
            })

            res.status(201).json(user);
        } catch (error) {
            console.error('Erreur lors de la création de l\'utilisateur :', error);
            res.status(500).json({ error: 'Erreur interne du serveur' });
        }
    },

    async getAllUsers(req, res) {
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
    },

    async getRolesUser(req, res) {
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
    },

    async getUser(req, res) {
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
    },

    async updateUser(req, res) {
        const { id } = req.params;
        try {

            const email = req.body.Email;
            const nom = req.body.Nom;
            const prenom = req.body.Prenom;
            const role = req.body.Role;
            const geography = req.body.Geography;
            const capacity = req.body.Capacity;
            const entreprise = req.body.Entreprise;

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
                        await Client.create({
                            ID_Compte: user.ID_Compte,
                            Adresse: geography
                        })
                    }
                    if (roleName === 'Fournisseur'){
                        await Fournisseur.create({
                            ID_Compte: user.ID_Compte,
                            Entreprise: entreprise,
                            ID_Commercial: 0
                        })
                    }
                    if (roleName === 'Livreur'){
                        await Commercial.create({
                            ID_Compte: user.ID_Compte,
                            Capacite: capacity,
                            ID_RespLogi: 0,
                            Capacite: capacity
                        })
                    }
                    if (roleName === 'Responsable_Logistique'){
                        await ResponsableLogistique.create({
                            ID_Compte: user.ID_Compte,
                            Secteur: geography
                        })
                    }
                    else {
                        await model.create({
                            ID_Compte: user.ID_Compte
                        });
                    }
                }
            }

            res.status(200).json(user);
        } catch (error) {
            console.error('Erreur lors de la mise à jour de l\'utilisateur :', error);
            res.status(500).json({ error: 'Erreur interne du serveur' });
        }
    },

    async deleteUser(req, res) {
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
    }
};

export default user;