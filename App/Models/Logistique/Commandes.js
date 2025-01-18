import { DataTypes } from 'sequelize';

const Commandes = sequelize.define('Logistique.Commandes', {
    ID_Commandes: {
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
    Date_Commande: {
        type: DataTypes.DATE,
        allowNull: false,
    },
},
{
    schema: 'Logistique',
    tableName: 'Commandes',
    timestamps: false,
});

export default Commandes;
