import Produits from '../../App/Models/Boutique/Produits.js';
import Stock from '../../App/Models/Logistique/Stock.js';

const product = {

    async createProduct(req, res) {
        try {

            const label = req.body.label;
            const marque = req.body.marque;
            const prix = req.body.prix;
            const poids = req.body.poids;
            const description = req.body.description;
            const taxes = 1;
            const Quantite = req.body.Stock;
            const ID_Fournisseur = req.body.ID_Fournisseur;
    
            const product = await Produits.create({
                label,
                marque,
                prix,
                poids,
                description,
                taxes,
            });
    
            const Stock = await Stock.create({
                ID_Produit: product.ID_Produit,
                quantite: Quantite && Quantite > 0 ? Quantite : 0,
                ID_Fournisseur
            });
    
            res.status(201).json(product);
        } catch (error) {
            console.error('Erreur lors de la création du produit :', error);
            res.status(500).json({ error: 'Erreur interne du serveur' });
        }
    },

    async getAllProducts(req, res) {
        try {
            const produits = await Produits.findAll();
            const accept = req.headers.accept;
    
            for (const produit of produits) {
                const stock = await Stock.findOne({ where: { ID_Produit: produit.ID_Produit } });
                produit.dataValues.stock = stock ? stock.quantite : 0;
            }
    
            if (accept.includes('application/json')) {
                res.status(200).json(produits);
            } else {
                res.status(406).send('Type de contenu non supporté');
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des produits :', error);
            res.status(500).json({ error: 'Erreur serveur' });
        }
    },

    async getProduct(req, res) {
        const ID_Produit  = req.params.id;

        try {
            const produit = await Produits.findByPk(ID_Produit);

            if (!produit) {
                return res.status(404).json({ error: 'Produit non trouvé' });
            }

            const stock = await Stock.findOne({ where: { ID_Produit: produit.ID_Produit } });
            produit.dataValues.stock = stock ? stock.quantite : 0;

            const accept = req.headers.accept;

            if (accept.includes('application/json')) {
                res.status(200).json(produit);
            } else {
                res.status(406).send('Type de contenu non supporté');
            }
        } catch (error) {
            console.error('Erreur lors de la récupération du produit :', error);
            res.status(500).json({ error: 'Erreur interne du serveur' });
        }
    },

    async updateProduct(req, res) {
        const { id } = req.params;
        try {

            const label = req.body.label;
            const marque = req.body.marque;
            const prix = req.body.prix;
            const poids = req.body.poids;
            const description = req.body.description;
            const quantite = req.body.stock;
            const taxes = 1;

            const product = await Produits.findByPk(id);
            if (!product) {
                return res.status(404).json({ error: 'Produit non trouvé' });
            }
            await product.update({
                label,
                marque,
                prix,
                poids,
                description,
                taxes,
            });

            const stock = await Stock.findOne({ where: { ID_Produit: product.ID_Produit } });
            await stock.update({
                Quantite: quantite,
            });

            res.status(200).json(product);
        } catch (error) {
            console.error('Erreur lors de la mise à jour du produit :', error);
            res.status(500).json({ error: 'Erreur interne du serveur' });
        }
    },

    async deleteProduct(req, res) {
        const { id } = req.params;
        try {
            const product = await Produits.findByPk(id);
            if (!product) {
                return res.status(404).json({ error: 'Produit non trouvé' });
            }
            await Stock.destroy({ where: { ID_Produit: product.ID_Produit } });
            await product.destroy();
            res.status(200).json({ message: 'Produit supprimé avec succès' });
        } catch (error) {
            console.error('Erreur lors de la suppression du produit :', error);
            res.status(500).json({ error: 'Erreur interne du serveur' });
        }
    },
};

export default product;