## Swagger / Documentation

[code](./routes/API/productApiRoutes.js)

http://mathis.mercier.angers.mds-project.fr/api-docs/

## Connexion BDD et ORM

[code](./server/dbConnectServ.js)

[code](./App/Models/Boutique/Produits.js)

## REST

Route (méthodes HTTP)
[code](./routes/API/productApiRoutes.js)

Controller (réponses HTTP)
[code](./App/controllers/productController.js)

## JSON / XML : header request

requête
[code](./public/script/produitScript.js)

controller
[code](./App/controllers/productController.js)

## JWT

[code](./server/authServ.js)

## Mise en production (avec P2M + SQLServer)

http://mathis.mercier.angers.mds-project.fr

## Postman + collections + token

voir Postman

## Architecture & Qualité de code

- **App/** : Contient les fichiers de logique métier et les modèles de données.
  - **controllers/** : Contient les contrôleurs pour gérer les différentes routes de l'API.
  - **Models/** : Contient les modèles de données pour les différentes entités de l'application.

- **config/** : Contient les fichiers de configuration, comme la configuration de Swagger.

- **public/** : Contient les fichiers statiques accessibles par le client (images, scripts, styles).

- **routes/** : Contient les fichiers de définition des routes de l'API.

- **server/** : Contient les fichiers de configuration du serveur, comme l'authentification et la connexion à la base de données.

- **views/** : Contient les fichiers de vues EJS pour le rendu côté serveur.

- **app.js** : Point d'entrée principal de l'application.

- **.env** : Fichier de configuration de l'API.

[code](./server/authServ.js)

## Page dédiée chat avec Socket.io => en lien avec le DAB

http://mathis.mercier.angers.mds-project.fr