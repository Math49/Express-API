import { DataTypes } from 'sequelize';
import { sequelize } from '../../../server/dbConnectServ.js';

const Article = sequelize.define('Boutique.Article', {
    ID_Produit: {
        type: DataTypes.INTEGER,
        foreignKey: true,
    },
    ID_Commande: {
        type: DataTypes.INTEGER,
        foreignKey: true,
        allowNull: false,
    },
    Quantite: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Prix: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
},
{
    schema: 'Boutique',
    tableName: 'Article',
    timestamps: false,
});

export default Article;
