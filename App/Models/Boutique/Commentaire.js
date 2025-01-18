import { DataTypes } from 'sequelize';
import {sequelize} from '../../../server/dbConnect.js';

const Commentaire = sequelize.define('Boutique.Commentaire', {
    ID_Produit: {
        type: DataTypes.INTEGER,
        foreignKey: true,
        autoIncrement: true,
    },
    ID_Client: {
        type: DataTypes.INTEGER,
        foreignKey: true,
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

export default Commentaire;
