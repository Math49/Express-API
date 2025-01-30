import express from 'express';
import user from '../../App/controllers/userController.js';
import { requireAuth } from '../../server/authServ.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Utilisateurs
 *   description: Gestion des utilisateurs
 */

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Créer un nouvel utilisateur
 *     description: Ajoute un utilisateur dans la base de données.
 *     tags: [Utilisateurs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Prenom:
 *                 type: string
 *                 example: "Jean"
 *               Nom:
 *                 type: string
 *                 example: "Dupont"
 *               Email:
 *                 type: string
 *                 example: "jean.dupont@email.com"
 *               Telephone:
 *                 type: string
 *                 example: "0612345678"
 *               Password:
 *                 type: string
 *                 example: "monMotDePasse123!"
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *       500:
 *         description: Erreur interne du serveur
 */
router.post('/users', requireAuth, user.createUser);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Récupérer tous les utilisateurs
 *     description: Renvoie la liste de tous les utilisateurs existants.
 *     tags: [Utilisateurs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des utilisateurs récupérée avec succès
 *       500:
 *         description: Erreur interne du serveur
 */
router.get('/users', requireAuth, user.getAllUsers);

/**
 * @swagger
 * /api/users/role/{role}:
 *   get:
 *     summary: Récupérer les utilisateurs par rôle
 *     description: Renvoie la liste des utilisateurs correspondant à un rôle spécifique.
 *     tags: [Utilisateurs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: role
 *         required: true
 *         schema:
 *           type: string
 *         description: Rôle de l'utilisateur (Administrateur, Client, Commercial, Fournisseur, Livreur, Responsable_Logistique)
 *     responses:
 *       200:
 *         description: Liste des utilisateurs récupérée avec succès
 *       500:
 *         description: Erreur interne du serveur
 */
router.get('/users/role/:role', requireAuth, user.getRolesUser);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Récupérer un utilisateur par ID
 *     description: Renvoie un utilisateur spécifique en fonction de son ID.
 *     tags: [Utilisateurs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'utilisateur
 *     responses:
 *       200:
 *         description: Utilisateur récupéré avec succès
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */
router.get('/users/:id', requireAuth, user.getUser);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Mettre à jour un utilisateur
 *     description: Modifie les informations d'un utilisateur existant.
 *     tags: [Utilisateurs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'utilisateur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Email:
 *                 type: string
 *                 example: "jean.dupont@email.com"
 *               Nom:
 *                 type: string
 *                 example: "Dupont"
 *               Prenom:
 *                 type: string
 *                 example: "Jean"
 *               Role:
 *                 type: string
 *                 example: "Client"
 *               Geography:
 *                 type: string
 *                 example: "0xE6100000010CA2258FA7655C51C0AD1402B9C47C51C0"
 *               Capacity:
 *                 type: integer
 *                 example: 50
 *               Entreprise:
 *                 type: string
 *                 example: "Ma Société"
 *     responses:
 *       200:
 *         description: Utilisateur mis à jour avec succès
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */
router.put('/users/:id', requireAuth, user.updateUser);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Supprimer un utilisateur
 *     description: Supprime un utilisateur existant.
 *     tags: [Utilisateurs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'utilisateur
 *     responses:
 *       200:
 *         description: Utilisateur supprimé avec succès
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */
router.delete('/users/:id', requireAuth, user.deleteUser);

export default router;
