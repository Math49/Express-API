import express from 'express';
import path from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import http from 'http';
import dbConnect from './server/dbConnectServ.js';
import { attachUser } from './server/authServ.js';
import { Server } from 'socket.io';
import socketServ from './server/socket.js';
import setupSwagger from "./config/swaggerConfig.js";

//import routes (/routes/)
import mainRoutes from './routes/mainRoute.js';
import errorRoutes from './routes/errorRoutes.js';
import boutiqueRoutes from './routes/boutiqueRoutes.js';
import authRoutes from './routes/authRoutes.js';
import profilRoutes from './routes/profilRoutes.js';

//import routes API (/routes/API/)
import authApiRoutes from './routes/API/authApiRoutes.js';

import userRoutes from './routes/API/userApiRoutes.js';
import productRoutes from './routes/API/productApiRoutes.js';
import orderRoutes from './routes/API/orderApiRoutes.js';
import deliveryTourRoutes from './routes/API/deliveryTourApiRoutes.js';
import commentRoutes from './routes/API/commentApiRoutes.js';
import messageRoutes from './routes/API/messageApiRoutes.js';
import assignmentRequestRoutes from './routes/API/assignmentRequestApiRoutes.js';

// Initialiser l'application
const app = express();
app.use(cors());
app.use(cookieParser());

const server = http.createServer(app);
const PORT = process.env.PORT;

const io = new Server(server);

app.use(attachUser);

// Middleware pour gérer les fichiers statiques (CSS, JS, images, etc.)
app.use('/static', express.static(path.join(path.resolve(), 'public')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(path.resolve(), 'views'));

// Connexion à la base de données
dbConnect();

setupSwagger(app);

const version = "v1";

// routes API
app.use(`/api/${version}`, authApiRoutes);
app.use(`/api/${version}`, userRoutes);
app.use(`/api/${version}`, productRoutes);
app.use(`/api/${version}`, orderRoutes);
app.use(`/api/${version}`, deliveryTourRoutes);
app.use(`/api/${version}`, commentRoutes);
app.use(`/api/${version}`, messageRoutes);
app.use(`/api/${version}`, assignmentRequestRoutes);

//routes
app.use('/', mainRoutes);
app.use('/', authRoutes);
app.use('/boutique', boutiqueRoutes);
app.use('/profil', profilRoutes);
app.use('/error', errorRoutes);

app.use((err, req, res, next) => {
    if (err.status === 401) {
        res.redirect('/error/401');
    } else if (err.status === 403) {
        res.redirect('/error/403');
    } else if (err.status === 404) {
        res.redirect('/error/404');
    } else if (err.status === 500) {
        res.redirect('/error/500');
    }else {
        next(err);
    }
});

app.use((req, res) => {
    res.redirect('/error/404');
});


socketServ(io);

// Lancer le serveur
server.listen(PORT, () => {
    console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
    console.log(`📄 Documentation Swagger disponible sur http://localhost:${PORT}/api-docs`);
});
