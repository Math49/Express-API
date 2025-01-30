import express from 'express';
import deliveryTour from '../../App/controllers/deliveryTourController.js';
import { requireAuth } from '../../server/authServ.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Tournées de livraison
 *   description: Gestion des tournées de livraison
 */

/**
 * @swagger
 * /api/delivery-tours:
 *   post:
 *     summary: Créer une nouvelle tournée de livraison
 *     description: Permet de créer une nouvelle tournée de livraison.
 *     tags: [Tournées de livraison]
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
 *                 example: 123
 *               ID_Livreur:
 *                 type: integer
 *                 example: 5
 *               ID_RespLogi:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: Tournée de livraison créée avec succès
 *       500:
 *         description: Erreur interne du serveur
 */
router.post('/delivery-tours', requireAuth, deliveryTour.createDeliveryTour);

/**
 * @swagger
 * /api/delivery-tours:
 *   get:
 *     summary: Récupérer toutes les tournées de livraison
 *     description: Renvoie la liste complète des tournées de livraison existantes.
 *     tags: [Tournées de livraison]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des tournées récupérée avec succès
 *       500:
 *         description: Erreur interne du serveur
 */
router.get('/delivery-tours', requireAuth, deliveryTour.getAllDeliveryTours);

/**
 * @swagger
 * /api/delivery-tours/{id}:
 *   get:
 *     summary: Récupérer une tournée de livraison spécifique
 *     description: Renvoie une tournée de livraison en fonction de son ID.
 *     tags: [Tournées de livraison]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la tournée de livraison à récupérer
 *     responses:
 *       200:
 *         description: Tournée de livraison récupérée avec succès
 *       404:
 *         description: Tournée de livraison non trouvée
 *       500:
 *         description: Erreur interne du serveur
 */
router.get('/delivery-tours/:id', requireAuth, deliveryTour.getDeliveryTour);

/**
 * @swagger
 * /api/delivery-tours/{id}:
 *   put:
 *     summary: Modifier une tournée de livraison
 *     description: Permet de mettre à jour les informations d'une tournée de livraison.
 *     tags: [Tournées de livraison]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la tournée de livraison à modifier
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ID_Livreur:
 *                 type: integer
 *                 example: 5
 *               ID_RespLogi:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Tournée de livraison mise à jour avec succès
 *       404:
 *         description: Tournée de livraison non trouvée
 *       500:
 *         description: Erreur interne du serveur
 */
router.put('/delivery-tours/:id', requireAuth, deliveryTour.updateDeliveryTour);

/**
 * @swagger
 * /api/delivery-tours/{id}:
 *   delete:
 *     summary: Supprimer une tournée de livraison
 *     description: Supprime une tournée de livraison spécifique.
 *     tags: [Tournées de livraison]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la tournée de livraison à supprimer
 *     responses:
 *       200:
 *         description: Tournée de livraison supprimée avec succès
 *       404:
 *         description: Tournée de livraison non trouvée
 *       500:
 *         description: Erreur interne du serveur
 */
router.delete('/delivery-tours/:id', requireAuth, deliveryTour.deleteDeliveryTour);

export default router;
