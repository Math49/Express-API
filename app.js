import express from 'express';
import path from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import http from 'http';
import dbConnect from './server/dbConnect_Serv.js';

//import routes (/routes/)
import mainRoutes from './routes/main_Route.js';


// Initialiser l'application
const app = express();
app.use(cors());
app.use(cookieParser());

const server = http.createServer(app);
const PORT = 8080;

// Middleware pour gérer les fichiers statiques (CSS, JS, images, etc.)
app.use(express.static(path.join(path.resolve(), 'public')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(path.resolve(), 'views'));

// Connexion à la base de données
dbConnect();

//routes
app.use('/', mainRoutes);

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

// Lancer le serveur
server.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
