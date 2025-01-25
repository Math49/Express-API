import { DataTypes } from 'sequelize';
import { sequelize } from '../../../server/dbConnectServ.js';

export const Administrateur = sequelize.define('Administrateur', {
    ID_Compte: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    schema: 'Utilisateurs',
    tableName: 'Administrateurs',
    timestamps: false,
});

export const Client = sequelize.define('Client', {
    ID_Client: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    Adresse:{
        type: DataTypes.GEOGRAPHY,
        allowNull: false,
    },
    ID_Compte: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    schema: 'Utilisateurs',
    tableName: 'Client',
    timestamps: false,
});

export const Commercial = sequelize.define('Commercial', {
    ID_Commercial: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    ID_Compte: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    schema: 'Utilisateurs',
    tableName: 'Commercial',
    timestamps: false,
});

export const Fournisseur = sequelize.define('Fournisseur', {
    ID_Fournisseur: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    Entreprise: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    ID_Commercial: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    ID_Compte: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    schema: 'Utilisateurs',
    tableName: 'Fournisseur',
    timestamps: false,
});

export const Livreur = sequelize.define('Livreur', {
    ID_Livreur: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    Secteur: {
        type: DataTypes.GEOGRAPHY,
        allowNull: false,
    },
    Capacite: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    ID_RespLogi: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    ID_Compte: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    schema: 'Utilisateurs',
    tableName: 'Livreur',
    timestamps: false,
});

export const ResponsableLogistique = sequelize.define('ResponsableLogistique', {
    ID_RespLogi: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    Secteur: {
        type: DataTypes.GEOGRAPHY,
        allowNull: false,
    },
    ID_Compte: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    schema: 'Utilisateurs',
    tableName: 'Responsable_Logistique',
    timestamps: false,
});
