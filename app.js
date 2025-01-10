import express from 'express';
import path from 'path';
import dbConnect from './server/dbConnect.js';
import cors from 'cors';
import {attachUser} from './server/auth.js';
import cookieParser from 'cookie-parser';
import { Server } from 'socket.io';
import http from 'http';
import socketServ from './server/chat.js';


//import routes (/routes/)
import mainRoutes from './routes/mainRoutes.js';
import dabRoutes from './routes/dabRoutes.js';
import authRoutes from './routes/authRoutes.js';


// Initialiser l'application
const app = express();
app.use(cors());
app.use(cookieParser());
app.use(attachUser)

const server = http.createServer(app); // Créez un serveur HTTP
const io = new Server(server);

// Configuration de base
const PORT = 8080;

// Middleware pour gérer les fichiers statiques (CSS, JS, images, etc.)
app.use(express.static(path.join(path.resolve(), 'public')));


// Middleware pour analyser les données des formulaires et JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configurer le moteur de template EJS
app.set('view engine', 'ejs');
app.set('views', path.join(path.resolve(), 'views'));

// Connexion à la base de données
dbConnect();

//routes
app.use('/', mainRoutes);

app.use('/dab', dabRoutes);

app.use('/auth', authRoutes);

// Gestion des erreurs
app.use((req, res) => {
    res.status(401).render('error/401', { title: 'Accès non autorisé' });
});
app.use((req, res) => {
    res.status(403).render('error/403', { title: 'Accès refusée' });
});

app.use((req, res) => {
    res.status(404).render('error/404', { title: 'Page non trouvée' });
});


socketServ(io);

// Lancer le serveur
server.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
