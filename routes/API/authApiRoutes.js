import express from 'express';
import auth from '../../App/controllers/authController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Authentification
 *   description: Gestion de l'authentification des utilisateurs
 */

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Connexion d'un utilisateur
 *     description: Permet à un utilisateur de se connecter en fournissant ses identifiants.
 *     tags: [Authentification]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "utilisateur@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Connexion réussie, renvoie un token d'authentification.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Connexion réussie"
 *                 user:
 *                   type: object
 *                   description: Informations de l'utilisateur connecté.
 *                 token:
 *                   type: string
 *                   description: Token JWT à utiliser pour les requêtes authentifiées.
 *       401:
 *         description: Identifiants incorrects.
 *       500:
 *         description: Erreur serveur lors de la connexion.
 */
router.post('/login', auth.login);

/**
 * @swagger
 * /api/logout:
 *   post:
 *     summary: Déconnexion d'un utilisateur
 *     description: Supprime le cookie contenant le token d'authentification pour déconnecter l'utilisateur.
 *     tags: [Authentification]
 *     responses:
 *       200:
 *         description: Déconnexion réussie.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Déconnexion réussie"
 */
router.post('/logout', auth.logout);

export default router;
