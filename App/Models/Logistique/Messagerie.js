import { DataTypes } from 'sequelize';
import { sequelize } from '../../../server/dbConnectServ.js';

const Messagerie = sequelize.define('Logistique.Messagerie', {
    ID_Message: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
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
    ID_Sender: {
        type: DataTypes.INTEGER,
        foreignKey: true,
        allowNull: false,
    },
    Message: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    Date_Message: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    Is_Deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    },
},
{
    schema: 'Logistique',
    tableName: 'Messagerie',
    timestamps: false,
});

export default Messagerie;
