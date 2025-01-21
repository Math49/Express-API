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
    tableName: 'Client',
    timestamps: false,
});

export const Commercial = sequelize.define('Commercial', {
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
    tableName: 'Commercial',
    timestamps: false,
});

export const Fournisseur = sequelize.define('Fournisseur', {
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
    tableName: 'Fournisseur',
    timestamps: false,
});

export const Livreur = sequelize.define('Livreur', {
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
    tableName: 'Livreur',
    timestamps: false,
});

export const ResponsableLogistique = sequelize.define('ResponsableLogistique', {
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
    tableName: 'Responsable_Logistique',
    timestamps: false,
});
