document.addEventListener("DOMContentLoaded", async () => {
    
    const userID = document.getElementById("userID").value;

    let user = null;
    let fournisseurs = null;
    let socket = io(); // Initialisation du socket global
    let currentRoom = null; // Stocke la room actuelle

    try {
        await fetch("/api/users/" + userID, {
            method: "GET",
            headers: { "Accept": "application/json" },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Erreur lors de la récupération de l'utilisateur");
            }
            return response.json();
        })
        .then(data => { user = data; });

        await fetch("/api/users/role/Fournisseur", {
            method: "GET",
            headers: { "Accept": "application/json" },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Erreur lors de la récupération des fournisseurs");
            }
            return response.json();
        })
        .then(data => { fournisseurs = data; });

    } catch (error) {
        console.error(error);
    }

    const roomNav = document.getElementById("roomNav");

    if(user.Role === "Commercial"){
        const fournisseurCommercial = fournisseurs.filter(fournisseur => fournisseur.data.ID_Commercial === user.data.ID_Commercial);

        roomNav.innerHTML = fournisseurCommercial.map(fournisseur => `
            <div class="roomDiv cursor-pointer bg-white m-2 px-[20px] py-[10px] rounded-lg shadow-lg" data-fournisseur="${fournisseur.data.ID_Fournisseur}" data-commercial="${fournisseur.data.ID_Commercial}" data-entreprise="${fournisseur.data.Entreprise}">
                <p class="text-xl font-medium">${fournisseur.data.Entreprise}</p>
            </div>
        `).join('');
    }
    else if(user.Role === "Fournisseur"){
        roomNav.innerHTML = `
            <div class="roomDiv cursor-pointer bg-white m-2 px-[20px] py-[10px] rounded-lg shadow-lg" data-fournisseur="${user.data.ID_Fournisseur}" data-commercial="${user.data.ID_Commercial}">
                <p class="text-xl font-medium">${user.data.Entreprise}</p>
            </div>
        `;
    }

    const roomDivs = document.querySelectorAll(".roomDiv");
    const roomContent = document.getElementById("roomContent");
    const chatBox = document.getElementById("chatBox");
    const messageInput = document.getElementById("messageInput");
    const sendMessage = document.getElementById("sendMessage");

    roomDivs.forEach(roomDiv => {
        roomDiv.addEventListener("click", () => {

            
            const ID_Fournisseur = roomDiv.getAttribute("data-fournisseur");
            const ID_Commercial = roomDiv.getAttribute("data-commercial");
            
            try{

                fetch(`/api/messages/${ID_Fournisseur}/${ID_Commercial}`, {
                    method: "GET",
                    headers: { "Accept": "application/json" },
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Erreur lors de la récupération des messages");
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    chatBox.innerHTML = data.map(message => `<p><strong>${message.sender.Prenom} ${message.sender.Nom} :</strong> ${message.Message}</p>`).join('');
                });

            }
            catch (error){
                console.error(error);
            }
            
            let newRoom = `room-${ID_Fournisseur}-${ID_Commercial}`;
            
            if (currentRoom === newRoom) return;

            if (currentRoom) {
                socket.emit("leaveRoom", { room: currentRoom });
            }

            socket.emit("joinRoom", { room: newRoom});
            currentRoom = newRoom;

            roomContent.classList.remove("hidden");
            chatBox.innerHTML = ""; 

            // Nettoyer les anciens écouteurs d'événements (évite les doublons)
            sendMessage.removeEventListener("click", sendMessageHandler);
            sendMessage.addEventListener("click", sendMessageHandler);

            function sendMessageHandler() {
                const message = messageInput.value.trim();
                if (message === "") return;

                const dabCommand = message.match(/^\/dab\s+([\d.]+)\s*([€$£])$/);

                if (dabCommand) {
                    console.log(dabCommand);
                    const amount = parseFloat(dabCommand[1]);
                    const devise = dabCommand[2];
            
                    socket.emit("dabCommand", { room: currentRoom, amount, devise });
                    messageInput.value = "";
                } else {
                    fetch("/api/messages", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ 
                            ID_Fournisseur: ID_Fournisseur,
                            ID_Commercial: ID_Commercial,
                            message: message,  
                            Date: new Date().toISOString().slice(0, 19).replace('T', ' ')
                        }),
                    })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error("Erreur lors de l'envoi du message");
                        }
                        socket.emit("sendMessage", { room: currentRoom, message, sender: `${user.Prenom} ${user.Nom}` });
                        messageInput.value = ""; // Réinitialiser le champ de saisie
                        return response.json();
                    })
                }

                

            }

            // Écouter les messages reçus (supprime les anciens écouteurs pour éviter les doublons)
            socket.off("receiveMessage").on("receiveMessage", (data) => {
                if (data.system) {
                    chatBox.innerHTML += `<p class="text-gray-500 italic"><strong>${data.sender} :</strong> ${data.message}</p>`;
                } else {
                    chatBox.innerHTML += `<p><strong>${data.sender} :</strong> ${data.message}</p>`;
                }
            });

        });
    });
});
