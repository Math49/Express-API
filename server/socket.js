export default function socketServ(io) {
    const connectedUsers = {};

    io.on("connection", (socket) => {
        console.log("Nouvelle connexion :", socket.id);

        // Rejoindre une room spécifique (fournisseur + commercial)
        socket.on("joinRoom", ({ ID_Fournisseur, ID_Commercial }) => {
            const roomName = `room_fournisseur_${ID_Fournisseur}`;
            socket.join(roomName);
            connectedUsers[socket.id] = { ID_Fournisseur, ID_Commercial };

            console.log(`User ${socket.id} a rejoint la room ${roomName}`);
        });

        // Recevoir un message et le diffuser à la room
        socket.on("sendMessage", ({ ID_Fournisseur, message, sender }) => {
            const roomName = `room_fournisseur_${ID_Fournisseur}`;
            io.to(roomName).emit("receiveMessage", { sender, message });
        });

        // Déconnexion d'un utilisateur
        socket.on("disconnect", () => {
            console.log("Utilisateur déconnecté :", socket.id);
            delete connectedUsers[socket.id];
        });
    });
}
