export default function socketServ(io) {
    const connectedUsers = {};

    io.on("connection", (socket) => {
        console.log("Nouvelle connexion :", socket.id);
    
        socket.on("joinRoom", async ({ room }) => {
            const rooms = Array.from(socket.rooms); // Liste des rooms de l'utilisateur
            for (const oldRoom of rooms) {
                if (oldRoom !== socket.id) {
                    await socket.leave(oldRoom);
                    console.log(`Utilisateur ${socket.id} a quitté la room ${oldRoom}`);
                }
            }
    
            socket.join(room);
            console.log(`Utilisateur ${socket.id} a rejoint la room ${room}`);
        });
    
        socket.on("sendMessage", ({ room, message, sender }) => {
            io.to(room).emit("receiveMessage", { message, sender });
            console.log(`Message de ${sender} envoyé dans la room ${room} : ${message}`);
        });
    
        socket.on("disconnect", () => {
            console.log(`Utilisateur ${socket.id} déconnecté`);
        });
    });
    
}
