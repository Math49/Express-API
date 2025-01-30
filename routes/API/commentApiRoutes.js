import express from 'express';
import { requireRole } from '../../server/authServ.js';
import comment from '../../App/controllers/commentController.js';
import { requireAuth } from '../../server/authServ.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Commentaires
 *   description: Gestion des commentaires sur les produits
 */

/**
 * @swagger
 * /api/products/{id}/comments:
 *   post:
 *     summary: Ajouter un commentaire à un produit
 *     description: Permet à un utilisateur de laisser un commentaire sur un produit.
 *     tags: [Commentaires]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du produit sur lequel ajouter un commentaire
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ID_Compte:
 *                 type: integer
 *                 example: 101
 *               Contenu:
 *                 type: string
 *                 example: "Très bon produit !"
 *     responses:
 *       201:
 *         description: Commentaire ajouté avec succès
 *       400:
 *         description: Données manquantes
 *       500:
 *         description: Erreur interne du serveur
 */
router.post('/products/:id/comments', requireAuth, comment.createComment);

/**
 * @swagger
 * /api/products/{id}/comments:
 *   get:
 *     summary: Récupérer tous les commentaires d'un produit
 *     description: Renvoie la liste de tous les commentaires pour un produit donné.
 *     tags: [Commentaires]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du produit dont on veut récupérer les commentaires
 *     responses:
 *       200:
 *         description: Liste des commentaires récupérée avec succès
 *       500:
 *         description: Erreur interne du serveur
 */
router.get('/products/:id/comments', requireAuth, comment.getAllComments);

/**
 * @swagger
 * /api/products/{id}/comments/{commentId}:
 *   get:
 *     summary: Récupérer un commentaire spécifique
 *     description: Renvoie un commentaire précis en fonction de son ID.
 *     tags: [Commentaires]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du produit
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du commentaire à récupérer
 *     responses:
 *       200:
 *         description: Commentaire récupéré avec succès
 *       404:
 *         description: Commentaire non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */
router.get('/products/:id/comments/:commentId', requireAuth, comment.getComment);

/**
 * @swagger
 * /api/products/{id}/comments/{commentId}:
 *   put:
 *     summary: Modifier un commentaire
 *     description: Permet à un utilisateur de modifier son commentaire sur un produit.
 *     tags: [Commentaires]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du produit
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du commentaire à modifier
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Contenu:
 *                 type: string
 *                 example: "Excellent produit, je recommande !"
 *     responses:
 *       200:
 *         description: Commentaire mis à jour avec succès
 *       404:
 *         description: Commentaire non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */
router.put('/products/:id/comments/:commentId', requireAuth, comment.updateComment);

/**
 * @swagger
 * /api/products/{id}/comments/{commentId}:
 *   delete:
 *     summary: Supprimer un commentaire
 *     description: Supprime un commentaire sur un produit. Seuls les administrateurs peuvent supprimer un commentaire.
 *     tags: [Commentaires]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du produit
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du commentaire à supprimer
 *     responses:
 *       200:
 *         description: Commentaire supprimé avec succès
 *       403:
 *         description: Accès refusé (seuls les administrateurs peuvent supprimer un commentaire)
 *       404:
 *         description: Commentaire non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */
router.delete('/products/:id/comments/:commentId', requireAuth, requireRole(['Administrateur']), comment.deleteComment);

export default router;
