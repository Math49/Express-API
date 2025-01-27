import { DataTypes } from 'sequelize';
import { sequelize } from '../../../server/dbConnectServ.js';

const Commandes = sequelize.define('Logistique.Commandes', {
    ID_Commande: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Num_Commande: {
        type: DataTypes.STRING(30),
        allowNull: false,
    },
    Volume: {
        type: DataTypes.DECIMAL(9, 3),
        allowNull: false,
    },
    Prix_Paye: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    ID_Client: {
        type: DataTypes.INTEGER,
        foreignKey: true,
        allowNull: false,
    },
    ID_Livraison: {
        type: DataTypes.INTEGER,
        foreignKey: true,
        allowNull: false,
    },
    Status: {
        type: DataTypes.STRING(30),
        allowNull: false,
    },
},
{
    schema: 'Logistique',
    tableName: 'Commandes',
    timestamps: true,
    createdAt: false,
    updatedAt: false,
});

export default Commandes;
