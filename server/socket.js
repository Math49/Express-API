import { Coupures } from "@dab_hock/dab";

export default function socketServ(io) {

    io.on("connection", (socket) => {
        console.log("Nouvelle connexion :", socket.id);
    
        socket.on("joinRoom", async ({ room }) => {
            try {
                const rooms = Array.from(socket.rooms);
                for (const oldRoom of rooms) {
                    if (oldRoom !== socket.id) {
                        await socket.leave(oldRoom);
                        socket.emit("receiveMessage", {
                            sender: "Système",
                            message: `Déconnexion de l'utilisateur`,
                            system: true,
                        });
                        console.log(`Utilisateur ${socket.id} a quitté la room ${oldRoom}`);
                    }
                }
                
                socket.join(room);

                socket.emit("receiveMessage", {
                    sender: "Système",
                    message: `Connexion de l'utilisateur`,
                    system: true,
                });
            }
            catch (error) {
                console.error(error);
            }

            console.log(`Utilisateur ${socket.id} a rejoint la room ${room}`);
        });
    
        socket.on("dabCommand", ({room, amount, devise }) => {
            try {

                console.log(`Commande /dab reçue pour ${amount} ${devise}`);

                const result = Coupures({
                    amount: amount,
                    devise: devise,
                })
                // Envoyer le message système à tous les utilisateurs de la room
                io.to(room).emit("receiveMessage", {
                    sender: "Système",
                    message: `💸 [DAB] Résultat pour ${result}`,
                    system: true,
                });
    
            } catch (error) {
                socket.emit("receiveMessage", {
                    sender: "Système",
                    message: "❌ Erreur dans la commande /dab. Utilisation : /dab {montant} {devise}",
                    system: true,
                });
                console.error(error);
            }
        });

        socket.on("sendMessage", ({ room, message, sender }) => {
            io.to(room).emit("receiveMessage", { message, sender });
            console.log(`Message de ${sender} envoyé dans la room ${room} : ${message}`);
        });
    
        socket.on("disconnect", () => {
            try{
                socket.emit("receiveMessage", {
                    sender: "Système",
                    message: `Déconnexion de l'utilisateur`,
                    system: true,
                });
            }
            catch (error) {
                console.error(error);
            }
        });
    });
    
}
