import express from 'express';
import path from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import http from 'http';
import dbConnect from './server/dbConnectServ.js';
import { attachUser } from './server/authServ.js';

//import routes (/routes/)
import mainRoutes from './routes/mainRoute.js';
import errorRoutes from './routes/errorRoutes.js';
import boutiqueRoutes from './routes/boutiqueRoutes.js';
import authRoutes from './routes/authRoutes.js';

//import routes API (/routes/API/)
import produitRoutes from './routes/API/produitRoutes.js';
import authApiRoutes from './routes/API/authApiRoutes.js';

// Initialiser l'application
const app = express();
app.use(cors());
app.use(cookieParser());

const server = http.createServer(app);
const PORT = 8080;

app.use(attachUser);

// Middleware pour gérer les fichiers statiques (CSS, JS, images, etc.)
app.use('/static', express.static(path.join(path.resolve(), 'public')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(path.resolve(), 'views'));

// Connexion à la base de données
dbConnect();

// routes API
app.use('/api', produitRoutes);
app.use('/api', authApiRoutes);

//routes
app.use('/', mainRoutes);
app.use('/', authRoutes);

app.use('/boutique', boutiqueRoutes);

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


// Gestion des erreurs
// app.use((req, res) => {
//     res.status(401).render('error/401', { title: 'Accès non autorisé', user: req.user });
// });
// app.use((req, res) => {
//     res.status(403).render('error/403', { title: 'Accès refusée', user: req.user });
// });

app.use((req, res) => {
    res.status(404).render('error/404', { title: 'Page non trouvée', user: req.user });
});

// Lancer le serveur
server.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
