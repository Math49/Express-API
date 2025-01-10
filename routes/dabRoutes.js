import express from 'express';
import { processData } from '../server/dab.js';

const router = express.Router();

// Route pour afficher le formulaire
router.get('/', (req, res) => {
    const result = req.query.result || null; // Récupérer le résultat des query parameters (si existant)
    res.render('dab', { result, user: req.user }); // Afficher la vue avec ou sans résultats
});

// Route pour traiter les données du formulaire
router.post('/', (req, res) => {
    const inputPrice = req.body.inputPrice; // Récupérer le montant
    const inputCountry = req.body.inputCountry; // Récupérer la devise

    const result = processData({ inputPrice, inputCountry }); // Traiter les données
    res.render('dab', { result }); // Retourner les résultats dans la vue
});


export default router;
