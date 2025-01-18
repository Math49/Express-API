import { DataTypes } from 'sequelize';

const Demande_Affectation = sequelize.define('Logistique.Demande_Affectation', {
    ID_Fournisseur: {
        type: DataTypes.INTEGER,
        foreignKey: true,
        allowNull: false,
    },
    ID_Commercial: {
        type: DataTypes.INTEGER,
        foreignKey: true,
        allowNull: false,
    },
},
{
    schema: 'Logistique',
    tableName: 'Demande_Affectation',
    timestamps: false,
});

export default Demande_Affectation;
