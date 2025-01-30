import express from 'express';
import assignmentRequest from '../../App/controllers/assignmentRequestController.js';
import { requireAuth } from '../../server/authServ.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Demandes d'affectation
 *   description: Gestion des demandes d'affectation entre commerciaux et fournisseurs
 */

/**
 * @swagger
 * /api/assignment-requests:
 *   post:
 *     summary: Créer une demande d'affectation
 *     description: Permet de créer une nouvelle demande d'affectation entre un fournisseur et un commercial.
 *     tags: [Demandes d'affectation]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ID_Fournisseur:
 *                 type: integer
 *                 example: 1
 *               ID_Commercial:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: Demande d'affectation créée avec succès.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.post('/assignment-requests', requireAuth, assignmentRequest.createRequest);

/**
 * @swagger
 * /api/assignment-requests:
 *   get:
 *     summary: Récupérer toutes les demandes d'affectation
 *     description: Renvoie la liste de toutes les demandes d'affectation.
 *     tags: [Demandes d'affectation]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des demandes récupérée avec succès.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.get('/assignment-requests', requireAuth, assignmentRequest.getAllRequests);

/**
 * @swagger
 * /api/assignment-requests/{id_Commercial}/{id_Fournisseur}:
 *   get:
 *     summary: Récupérer une demande d'affectation spécifique
 *     description: Renvoie une demande d'affectation entre un fournisseur et un commercial.
 *     tags: [Demandes d'affectation]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_Commercial
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du commercial.
 *       - in: path
 *         name: id_Fournisseur
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du fournisseur.
 *     responses:
 *       200:
 *         description: Demande d'affectation récupérée avec succès.
 *       404:
 *         description: Demande d'affectation non trouvée.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.get('/assignment-requests/:id_Commercial/:id_Fournisseur', requireAuth, assignmentRequest.getRequest);

/**
 * @swagger
 * /api/assignment-requests/{id_Commercial}/{id_Fournisseur}:
 *   put:
 *     summary: Mettre à jour une demande d'affectation
 *     description: Met à jour une demande d'affectation existante.
 *     tags: [Demandes d'affectation]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_Commercial
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du commercial.
 *       - in: path
 *         name: id_Fournisseur
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du fournisseur.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ID_Fournisseur:
 *                 type: integer
 *                 example: 1
 *               ID_Commercial:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Demande d'affectation mise à jour avec succès.
 *       404:
 *         description: Demande d'affectation non trouvée.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.put('/assignment-requests/:id_Commercial/:id_Fournisseur', requireAuth, assignmentRequest.updateRequest);

/**
 * @swagger
 * /api/assignment-requests:
 *   delete:
 *     summary: Supprimer une demande d'affectation
 *     description: Supprime une demande d'affectation en fonction des IDs du fournisseur et du commercial.
 *     tags: [Demandes d'affectation]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ID_Fournisseur:
 *                 type: integer
 *                 example: 1
 *               ID_Commercial:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Demande d'affectation supprimée avec succès.
 *       404:
 *         description: Demande d'affectation non trouvée.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.delete('/assignment-requests', requireAuth, assignmentRequest.deleteRequest);

/**
 * @swagger
 * /api/accept-assignment-requests/{id_Commercial}/{id_Fournisseur}:
 *   put:
 *     summary: Accepter une demande d'affectation
 *     description: Permet à un commercial d'accepter une demande d'affectation d'un fournisseur.
 *     tags: [Demandes d'affectation]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_Commercial
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du commercial.
 *       - in: path
 *         name: id_Fournisseur
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du fournisseur.
 *     responses:
 *       200:
 *         description: Demande d'affectation acceptée avec succès.
 *       404:
 *         description: Demande d'affectation ou fournisseur non trouvé.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.put('/accept-assignment-requests/:id_Commercial/:id_Fournisseur', requireAuth, assignmentRequest.acceptRequest);

export default router;
