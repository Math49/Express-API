import jwt from 'jsonwebtoken';
import Comptes from '../App/Models/Utilisateurs/Comptes.js'; // Modèle principal User
import { Administrateur, Client, Commercial, Fournisseur, Livreur, ResponsableLogistique } from '../App/Models/Utilisateurs/Roles.js'; // Modèles des rôles

const secretKey = 'azerty';

export async function authenticateUser(email, password) {
    try {
        // Recherche de l'utilisateur
        const user = await Comptes.findOne({ where: { Email: email } });

        if (!user) return null;

        // Vérification du mot de passe
        if (password !== user.Password) {
            return null;
        }

        console.log('Mot de passe correct');

        // Vérification du rôle en parcourant les tables des rôles
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

        if (!foundRole) return null;

        user.role = foundRole;

        return user;
    } catch (err) {
        console.error('Erreur lors de l\'authentification :', err);
        throw err;
    }
}


// Générer un token JWT
export function generateToken(user) {
    return jwt.sign(
        { id: user.ID_Compte, role: user.role },
        secretKey,
        { expiresIn: '1d' }
    );
}

// récpérer le user à partir du token
export async function getUserFromToken(token) {
    try {
        const decoded = jwt.verify(token, secretKey);

        // Recherche de l'utilisateur
        const user = await Comptes.findOne({ where: { ID_Compte: decoded.id } });
        user.role = decoded.role;

        if (!user) return null;

        return user;
    } catch (err) {
        console.error('Erreur lors de la vérification du token :', err);
        return null;
    }
}


// Middleware pour protéger les routes
export async function requireAuth(req, res, next) {
    const token = req.cookies?.auth_token;
    if (!token) {
        res.status(401).render('error/401', { title: 'Accès refusée' });
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        const user = await Comptes.findOne({ where: { ID_Compte: decoded.id } });

        if (!user) {
            req.user = null;
            return next();
        }

        user.role = decoded.role;
        req.user = user;
        next();
    } catch (err) {
        res.status(403).render('error/403', { title: 'Accès refusée' });
    }
}

export async function attachUser(req, res, next) {
    const token = req.cookies?.auth_token;

    if (!token) {
        req.user = null; // Définir l'utilisateur comme non connecté
        return next();
    }

    try {
        const decoded = jwt.verify(token, secretKey);

        // Rechercher l'utilisateur en base de données
        const user = await Comptes.findOne({ where: { ID_Compte: decoded.id } });
        if (!user) {
            req.user = null;
            return next();
        }

        req.user = {
            id: user.ID_Compte,
            role: decoded.role,
            prenom: user.Prenom,
            nom: user.Nom,
            email: user.Email,
            tel: user.Telephone,
        };
    } catch (err) {
        req.user = null; // Token invalide ou expiré
    }

    next();
}


export function requireRole(roles) {
    return (req, res, next) => {
        if (!roles.includes(req.user?.role)) {
            res.status(403).render('error/403', { title: 'Accès refusée' });
        }
        next();
    };
}

