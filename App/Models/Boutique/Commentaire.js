import { DataTypes } from 'sequelize';
import { sequelize } from '../../../server/dbConnectServ.js';

const Commentaire = sequelize.define('Boutique.Commentaire', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    ID_Produit: {
        type: DataTypes.INTEGER,
        foreignKey: true,
        references: {
            model: 'Produits',
            key: 'ID_Produit',
        },
        allowNull: false,
    },
    ID_Compte: {
        type: DataTypes.INTEGER,
        foreignKey: true,
        references: {
            model: 'Comptes',
            key: 'ID_Compte',
        },
        allowNull: false,
    },
    Commentaire: {
        type: DataTypes.TEXT,
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
    tableName: 'Commentaire',
    timestamps: false,
    
});

Commentaire.removeAttribute('id');

export default Commentaire;
