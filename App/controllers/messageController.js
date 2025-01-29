import Messagerie from '../../App/Models/Logistique/Messagerie.js';
import Comptes from '../Models/Utilisateurs/Comptes.js';
import { Commercial, Fournisseur } from '../Models/Utilisateurs/Roles.js';

const message = {

    async createMessage(req, res) {
        try {

            const ID_Fournisseur = req.body.ID_Fournisseur;
            const ID_Commercial = req.body.ID_Commercial;
            const Textmessage = req.body.message;
            const Date = req.body.Date;
            const Sender = req.user.id;

            const message = await Messagerie.create({
                ID_Sender: Sender,
                ID_Fournisseur: ID_Fournisseur,
                ID_Commercial: ID_Commercial,
                Message: Textmessage,
                Date_Message: Date,
            });
            res.status(201).json(message);
        } catch (error) {
            console.error('Erreur lors de la création du message :', error);
            res.status(500).json({ error: 'Erreur interne du serveur' });
        }
    },

    async getAllMessages(req, res) {
        try {
            const messages = await Messagerie.findAll();
            res.status(200).json(messages);
        } catch (error) {
            console.error('Erreur lors de la récupération des messages :', error);
            res.status(500).json({ error: 'Erreur interne du serveur' });
        }
    },

    async getMessages(req, res) {
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
    },

    async getMessagesRooms(req, res) {
        const { id_Fournisseur, id_Commercial } = req.params;
        try {
            const messages = await Messagerie.findAll({
                where: {
                    ID_Fournisseur: id_Fournisseur,
                    ID_Commercial: id_Commercial,
                }
            });

            for (const message of messages) {
                const sender = await Comptes.findByPk(message.ID_Sender);
                message.dataValues.sender = sender.dataValues;
            }
            if (!messages) {
                return res.status(404).json({ error: 'Messages non trouvés' });
            }
            res.status(200).json(messages);
        } catch (error) {
            console.error('Erreur lors de la récupération des messages :', error);
            res.status(500).json({ error: 'Erreur interne du serveur' });
        }
    },

    async updateMessage(req, res) {
        const { id } = req.params;
        try {
            const message = await Messagerie.findByPk(id);
            if (!message) {
                return res.status(404).json({ error: 'Message non trouvé' });
            }
            await message.update({
                Textmessage: req.body.Textmessage,
                Date: req.body.Date,
            });
            res.status(200).json(message);
        } catch (error) {
            console.error('Erreur lors de la mise à jour du message :', error);
            res.status(500).json({ error: 'Erreur interne du serveur' });
        }
    },

    async deleteMessage(req, res) {
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
    }
};

export default message;