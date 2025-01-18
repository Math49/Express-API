import { DataTypes } from 'sequelize';
import {sequelize} from '../../../server/dbConnect.js';

const Produits = sequelize.define('Boutique.Produits', {
    ID_Produit: {
        type: DataTypes.STRING(50),
        primaryKey: true,
        autoIncrement: true,
    },
    Label: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    Marque: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    Poids_en_g: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    Prix_HT: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    Description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    ID_Taxes: {
        type: DataTypes.INTEGER,
        foreignKey: true,
        allowNull: false,
    },
    IsDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    },
},
{
    schema: 'Boutique',
    tableName: 'Produits',
    timestamps: false,
});

export default Produits;
