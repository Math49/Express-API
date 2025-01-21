import { DataTypes } from 'sequelize';
import { sequelize } from '../../../server/dbConnectServ.js';


const Comptes = sequelize.define('Utilisateurs.Comptes', {
    ID_Compte: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Nom: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    Prenom: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    Email: {
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false,
    },
    Telephone: {
        type: DataTypes.STRING(15),
        allowNull: false,
    },
    Password: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    IsDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    },
},
{
    schema: 'Utilisateurs',
    tableName: 'Comptes',
    timestamps: false,
});

export default Comptes;
