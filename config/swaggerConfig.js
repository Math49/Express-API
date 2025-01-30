import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API Confiserie",
            version: "1.0.0",
            description: "Documentation de l'API de gestion des produits, commandes et messagerie.",
        },
        servers: [
            {
                url: "http://localhost:8080", // 🔥 Assure-toi que c'est bien le bon port
                description: "Serveur de développement"
            },
            {
                url: "http://mathis.mercier.angers.mds-project.fr", // 🔥 Assure-toi que c'est bien le bon nom de domaine
                description: "Serveur de production"
            }

        ]
    },
    apis: ["./routes/API/*.js"] // 🔹 Chemin vers tes fichiers de routes
};

const swaggerSpec = swaggerJsdoc(options);

const setupSwagger = (app) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

export default setupSwagger;
