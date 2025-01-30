import { Sequelize } from 'sequelize';
import dotenv from 'dotenv'
dotenv.config();


Sequelize.DATE.prototype._stringify = function _stringify(date, options) {
    date = this._applyTimezone(date, options);
    return date.format('YYYY-MM-DD HH:mm:ss');
};

const sequelize = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT, 10),
        dialect: process.env.DB_DIALECT || 'mssql',
        dialectOptions: {
            instanceName: process.env.DB_INSTANCE,
            options: {
                encrypt: process.env.DB_ENCRYPT === 'true',
                trustServerCertificate: process.env.DB_TRUST_CERTIFICATE === 'true',
            },
        },
        logging: false,
    }
);

function dbConnect() {
    (async () => {
        try {
            await sequelize.authenticate();
            console.log('Connexion à la base de données réussie !');
        } catch (error) {
            console.error('Erreur lors de la connexion à la base de données :', error);
        }
    })();

}

export { sequelize };

export default dbConnect;