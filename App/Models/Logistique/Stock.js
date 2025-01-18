import { DataTypes } from 'sequelize';

const Stock = sequelize.define('Logistique.Stock', {
    ID_produit: {
        type: DataTypes.STRING(50),
        primaryKey: true,
        foreignKey: true,
        allowNull: false,
    },
    Quantite: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    ID_Fournisseur: {
        type: DataTypes.INTEGER,
        foreignKey: true,
        allowNull: false,
    },
},
{
    schema: 'Logistique',
    tableName: 'Stock',
    timestamps: false,
});

export default Stock;
