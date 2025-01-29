document.addEventListener("DOMContentLoaded", () => {
    const socket = io();

    const ID_Fournisseur = 102; // Récupérer dynamiquement selon l'utilisateur connecté
    const ID_Commercial = 5;    // Récupérer dynamiquement selon l'utilisateur connecté

    // Rejoindre la room du fournisseur
    socket.emit("joinRoom", { ID_Fournisseur, ID_Commercial });

    const sendMessage = document.getElementById("sendMessage");
    // Envoyer un message
    sendMessage.addEventListener("click", () => {
        const messageInput = document.getElementById("messageInput");
        const message = messageInput.value;

        socket.emit("sendMessage", {
            ID_Fournisseur,
            message,
            sender: "Fournisseur 101", // Nom du sender
        });

        messageInput.value = ""; // Vider le champ
    });

    // Écouter les messages reçus
    socket.on("receiveMessage", (data) => {
        const chatBox = document.getElementById("chatBox");
        chatBox.innerHTML += `<p><strong>${data.sender} :</strong> ${data.message}</p>`;
    });
});