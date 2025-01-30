import express from 'express';
import order from '../../App/controllers/orderController.js';
import { requireAuth } from '../../server/authServ.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Commandes
 *   description: Gestion des commandes et des articles associés
 */

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Créer une nouvelle commande
 *     description: Ajoute une commande avec des articles associés.
 *     tags: [Commandes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ID_Client:
 *                 type: integer
 *                 example: 3
 *               produits:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     ID_Produit:
 *                       type: string
 *                       example: "P105"
 *                     Prix_HT:
 *                       type: number
 *                       format: float
 *                       example: 2.99
 *                     quantity:
 *                       type: integer
 *                       example: 2
 *     responses:
 *       201:
 *         description: Commande créée avec succès
 *       500:
 *         description: Erreur interne du serveur
 */
router.post('/orders', requireAuth, order.createOrder);

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Récupérer toutes les commandes
 *     description: Renvoie la liste de toutes les commandes avec leurs articles.
 *     tags: [Commandes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des commandes récupérée avec succès
 *       500:
 *         description: Erreur interne du serveur
 */
router.get('/orders', requireAuth, order.getAllOrders);

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Récupérer une commande par ID
 *     description: Renvoie une commande spécifique en fonction de son ID.
 *     tags: [Commandes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la commande
 *     responses:
 *       200:
 *         description: Commande récupérée avec succès
 *       404:
 *         description: Commande non trouvée
 *       500:
 *         description: Erreur interne du serveur
 */
router.get('/orders/:id', requireAuth, order.getOrder);

/**
 * @swagger
 * /api/orders/{id}:
 *   put:
 *     summary: Mettre à jour une commande
 *     description: Modifie les informations d'une commande existante.
 *     tags: [Commandes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la commande
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               num_Commande:
 *                 type: string
 *                 example: "654321"
 *               ID_Client:
 *                 type: integer
 *                 example: 3
 *               Volume:
 *                 type: number
 *                 format: float
 *                 example: 0
 *               Prix_Paye:
 *                 type: number
 *                 format: float
 *                 example: 15.98
 *               ID_Livraison:
 *                 type: integer
 *                 example: 0
 *               articles:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     ID_Article:
 *                       type: integer
 *                       example: 10
 *     responses:
 *       200:
 *         description: Commande mise à jour avec succès
 *       404:
 *         description: Commande non trouvée
 *       500:
 *         description: Erreur interne du serveur
 */
router.put('/orders/:id', requireAuth, order.updateOrder);

/**
 * @swagger
 * /api/orders/{id}:
 *   delete:
 *     summary: Supprimer une commande
 *     description: Supprime une commande existante et ses articles associés.
 *     tags: [Commandes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la commande
 *     responses:
 *       200:
 *         description: Commande supprimée avec succès
 *       404:
 *         description: Commande non trouvée
 *       500:
 *         description: Erreur interne du serveur
 */
router.delete('/orders/:id', requireAuth, order.deleteOrder);

/**
 * @swagger
 * /api/articles:
 *   post:
 *     summary: Ajouter un article à une commande
 *     description: Ajoute un nouvel article à une commande existante.
 *     tags: [Commandes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ID_Commande:
 *                 type: integer
 *                 example: 1
 *               ID_Produit:
 *                 type: string
 *                 example: "P105"
 *               Quantite:
 *                 type: integer
 *                 example: 3
 *               Prix:
 *                 type: number
 *                 format: float
 *                 example: 5.99
 *     responses:
 *       201:
 *         description: Article ajouté avec succès
 *       500:
 *         description: Erreur interne du serveur
 */
router.post('/articles', requireAuth, order.createArticle);

export default router;
