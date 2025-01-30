import express from 'express';
import product from '../../App/controllers/productController.js';
import { requireAuth } from '../../server/authServ.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Produits
 *   description: Gestion des produits
 */

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Ajouter un nouveau produit
 *     description: Création d'un produit dans la base de données.
 *     tags: [Produits]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Label:
 *                 type: string
 *                 example: "Chocolat"
 *               Marque:
 *                 type: string
 *                 example: "Lindt"
 *               Poids_en_g:
 *                 type: integer
 *                 example: 150
 *               Prix_HT:
 *                 type: number
 *                 format: float
 *                 example: 2.99
 *               Description:
 *                 type: string
 *                 example: "Chocolat au lait"
 *               ID_Fournisseur:
 *                 type: integer
 *                 example: 1
 *               Stock:
 *                 type: integer
 *                 example: 100
 *     responses:
 *       201:
 *         description: Produit ajouté avec succès
 *       500:
 *         description: Erreur interne du serveur
 */
router.post('/products', product.createProduct);

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Récupérer tous les produits
 *     description: Renvoie la liste de tous les produits disponibles.
 *     tags: [Produits]
 *     responses:
 *       200:
 *         description: Liste des produits récupérée avec succès
 *       500:
 *         description: Erreur interne du serveur
 */
router.get('/products', product.getAllProducts);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Récupérer un produit par ID
 *     description: Renvoie un produit spécifique basé sur son ID.
 *     tags: [Produits]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du produit
 *     responses:
 *       200:
 *         description: Produit récupéré avec succès
 *       404:
 *         description: Produit non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */
router.get('/products/:id', product.getProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Mettre à jour un produit
 *     description: Mise à jour d'un produit existant.
 *     tags: [Produits]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du produit
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Label:
 *                 type: string
 *                 example: "Chocolat Noir"
 *               Marque:
 *                 type: string
 *                 example: "Côte d'Or"
 *               Poids_en_g:
 *                 type: integer
 *                 example: 200
 *               Prix_HT:
 *                 type: number
 *                 format: float
 *                 example: 3.99
 *               Description:
 *                 type: string
 *                 example: "Chocolat noir intense"
 *               Stock:
 *                 type: integer
 *                 example: 50
 *     responses:
 *       200:
 *         description: Produit mis à jour avec succès
 *       404:
 *         description: Produit non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */
router.put('/products/:id', requireAuth, product.updateProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Supprimer un produit
 *     description: Supprime un produit existant.
 *     tags: [Produits]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du produit
 *     responses:
 *       200:
 *         description: Produit supprimé avec succès
 *       404:
 *         description: Produit non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */
router.delete('/products/:id', requireAuth, product.deleteProduct);

export default router;
