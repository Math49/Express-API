import jwt from 'jsonwebtoken';
import Comptes from '../App/Models/Comptes.js'; // Modèle principal User


export default function socketServ(io) {

    io.on('connection', async(socket) => {
        const token = socket.handshake.headers.cookie
            ?.split('; ')
            .find(row => row.startsWith('auth_token='))
            ?.split('=')[1];

        if (!token) {
            console.log('Utilisateur non connecté.');
            socket.disconnect();
            return;
        }

        try {
            let secretKey = "azerty"
            const decoded = jwt.verify(token, secretKey);
            
                
            await Comptes.findOne({ where: { ID_Compte: decoded.id } })
            .then(user => {
                socket.user = user.dataValues; // Associez l'utilisateur au socket
            })
            .catch(err => {
                console.error("Erreur lors de la recherche de l'utilisateur :", err);
                socket.disconnect(); // Déconnectez le socket en cas d'erreur
            });

            let msg = 'Utilisateur connecté';
            let time = new Date().toUTCString();

            const message = { user: socket.user, text: msg, time: time, type: 'system'};
            io.emit('chatMessage', message);

        } catch (err) {
            console.error('Token invalide ou expiré :', err.message);
            socket.disconnect();
            return;
        }

        // Écoute des messages envoyés par le client
        socket.on('chatMessage', (msg) => {

            let time = new Date().toUTCString();

            // Ajoutez le nom d'utilisateur dans le message
            const message = { user: socket.user, text: msg, time: time, type: 'user' }; // Associer le rôle au message (ou utilisez un champ nom)
            io.emit('chatMessage', message);
        });

        // Détecter les déconnexions
        socket.on('disconnect', () => {
            console.log('Un utilisateur s\'est déconnecté.');
        });
    });
}    