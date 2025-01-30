import express from 'express';
import message from '../../App/controllers/messageController.js';
import { requireAuth } from '../../server/authServ.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Messagerie
 *   description: Gestion des messages entre fournisseurs et commerciaux
 */

/**
 * @swagger
 * /api/messages:
 *   post:
 *     summary: Envoyer un message
 *     description: Permet à un utilisateur d'envoyer un message dans une conversation spécifique.
 *     tags: [Messagerie]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ID_Fournisseur:
 *                 type: integer
 *                 example: 3
 *               ID_Commercial:
 *                 type: integer
 *                 example: 5
 *               message:
 *                 type: string
 *                 example: "Bonjour, comment se passe la livraison ?"
 *               Date:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-01-30T12:00:00Z"
 *     responses:
 *       201:
 *         description: Message envoyé avec succès
 *       500:
 *         description: Erreur interne du serveur
 */
router.post('/messages', requireAuth, message.createMessage);

/**
 * @swagger
 * /api/messages:
 *   get:
 *     summary: Récupérer tous les messages
 *     description: Renvoie la liste complète des messages stockés.
 *     tags: [Messagerie]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des messages récupérée avec succès
 *       500:
 *         description: Erreur interne du serveur
 */
router.get('/messages', requireAuth, message.getAllMessages);

/**
 * @swagger
 * /api/messages/{id}:
 *   get:
 *     summary: Récupérer un message spécifique
 *     description: Renvoie un message en fonction de son ID.
 *     tags: [Messagerie]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du message à récupérer
 *     responses:
 *       200:
 *         description: Message récupéré avec succès
 *       404:
 *         description: Message non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */
router.get('/messages/:id', requireAuth, message.getMessages);

/**
 * @swagger
 * /api/messages/{id_Fournisseur}/{id_Commercial}:
 *   get:
 *     summary: Récupérer tous les messages entre un fournisseur et son commercial
 *     description: Renvoie l'historique des messages échangés entre un fournisseur et un commercial.
 *     tags: [Messagerie]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_Fournisseur
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du fournisseur
 *       - in: path
 *         name: id_Commercial
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du commercial
 *     responses:
 *       200:
 *         description: Historique des messages récupéré avec succès
 *       404:
 *         description: Aucun message trouvé
 *       500:
 *         description: Erreur interne du serveur
 */
router.get('/messages/:id_Fournisseur/:id_Commercial', requireAuth, message.getMessagesRooms);

/**
 * @swagger
 * /api/messages/{id}:
 *   put:
 *     summary: Modifier un message
 *     description: Permet de modifier un message existant.
 *     tags: [Messagerie]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du message à modifier
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Textmessage:
 *                 type: string
 *                 example: "Le statut de la commande a changé."
 *               Date:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-01-30T12:30:00Z"
 *     responses:
 *       200:
 *         description: Message mis à jour avec succès
 *       404:
 *         description: Message non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */
router.put('/messages/:id', requireAuth, message.updateMessage);

/**
 * @swagger
 * /api/messages/{id}:
 *   delete:
 *     summary: Supprimer un message
 *     description: Supprime un message spécifique.
 *     tags: [Messagerie]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du message à supprimer
 *     responses:
 *       200:
 *         description: Message supprimé avec succès
 *       404:
 *         description: Message non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */
router.delete('/messages/:id', requireAuth, message.deleteMessage);

export default router;
