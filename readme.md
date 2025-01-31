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

Express-API
- **App/**
    - **controllers/**
    - **Models/**
- **config/**
- **public/**
    - **images/**
    - **script/**
    - **styles/**
- **routes/**
    - **API/**
- **server/**
- **views/**
    - **components/**
- **app.js**
- **.env**

[code](app.js)

[code](./server/authServ.js)

## Page dédiée chat avec Socket.io => en lien avec le DAB

http://mathis.mercier.angers.mds-project.fr

[code](./server/socket.js)