const socket = io(); // Initialise la connexion avec le serveur Socket.IO

// Éléments HTML
const chatForm = document.getElementById('chatForm');
const messageInput = document.getElementById('messageInput');
const messagesDiv = document.getElementById('messages');

// Écouter les messages du serveur
socket.on('chatMessage', (msg) => {
    const messageElement = document.createElement('div');
    messageElement.style.marginBottom = '10px';
    messageElement.style.display = 'flex';
    messageElement.style.justifyContent = 'space-between';
    const textElement = document.createElement('span');
    const userElement = document.createElement('strong');
    const timeElement = document.createElement('time');

    // Conversion de la date au format local
    const utcDate = new Date(msg.time); // Convertit la chaîne en objet Date
    const options = { 
        hour: '2-digit', 
        minute: '2-digit', 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric' 
    };

    // Formatage de la date locale
    const formattedDate = utcDate.toLocaleString('fr-FR', options);


    console.log(msg.time);

    switch (msg.type) {
        case 'system':
            messageElement.style.color = 'gray';

            userElement.textContent = 'Système';
            textElement.textContent = `  ${msg.text} : ${msg.user.Prenom} ${msg.user.Nom}`;
            timeElement.textContent = formattedDate;

            messageElement.appendChild(userElement);
            messageElement.appendChild(textElement);
            messageElement.appendChild(timeElement);

            break;
        case 'user':
            messageElement.style.color = 'black';

            userElement.textContent = `${msg.user.Prenom} ${msg.user.Nom}`;
            textElement.textContent = msg.text;
            timeElement.textContent = formattedDate;

            messageElement.appendChild(userElement);
            messageElement.appendChild(textElement);
            messageElement.appendChild(timeElement);

            break;
    }

    messagesDiv.appendChild(messageElement);
});

// Envoyer un message
chatForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Empêche la soumission classique du formulaire

    const message = messageInput.value;
    socket.emit('chatMessage', message); // Envoyer le message au serveur

    messageInput.value = ''; // Effacer le champ de saisie
    messageInput.focus();
});
