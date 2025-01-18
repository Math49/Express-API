import { DataTypes } from 'sequelize';
import {sequelize} from '../../../server/dbConnect.js';

const Taxes = sequelize.define('Boutique.Taxes', {
    ID_Taxes: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Pays: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    Taxes: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
    },
},
{
    schema: 'Boutique',
    tableName: 'Taxes',
    timestamps: false,
});

export default Taxes;
