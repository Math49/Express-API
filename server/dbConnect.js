import { Sequelize } from 'sequelize';
import dotenv from 'dotenv'
dotenv.config();


const sequelize = new Sequelize(
    process.env.DB_DATABASE,       // Nom de la base de données
    process.env.DB_USER,           // Nom d'utilisateur
    process.env.DB_PASSWORD,       // Mot de passe
    {
        host: process.env.DB_HOST, // Hôte ou serveur
        port: parseInt(process.env.DB_PORT, 10), // Port SQL Server
        dialect: process.env.DB_DIALECT || 'mssql',       // Dialecte : mssql
        dialectOptions: {
            instanceName: process.env.DB_INSTANCE, // Instance nommée (ex. SQLEXPRESS)
            options: {
                encrypt: process.env.DB_ENCRYPT === 'true', // Chiffrement des données
                trustServerCertificate: process.env.DB_TRUST_CERTIFICATE === 'true', // Ignorer les problèmes de certificat
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