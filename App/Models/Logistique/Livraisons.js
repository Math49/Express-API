import { DataTypes } from 'sequelize';

const Livraisons = sequelize.define('Logistique.Livraisons', {
    ID_Livraison: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    ID_Livreur: {
        type: DataTypes.INTEGER,
        foreignKey: true,
        allowNull: false,
    },
    ID_RespLogi: {
        type: DataTypes.INTEGER,
        foreignKey: true,
        allowNull: false,
    },
},
{
    schema: 'Logistique',
    tableName: 'Livraisons',
    timestamps: false,
});

export default Livraisons;
