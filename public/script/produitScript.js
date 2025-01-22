document.addEventListener('DOMContentLoaded', function() {
    
    const produitID = window.location.pathname.split('/').pop();

    fetch(`/api/produits/${produitID}`,{
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Produit non trouvé ou erreur du serveur');
        }
        return response.json();
    })
    .then(data => {

        const produitLabel = document.getElementById('produitLabel');
        const produitMarque = document.getElementById('produitMarque');
        const produitPrix = document.getElementById('produitPrixHT');
        const produitDescription = document.getElementById('produitDescr');

        produitLabel.textContent += data.Label;
        produitMarque.textContent += data.Marque;
        produitPrix.textContent += data.Prix_HT + '€';
        produitDescription.textContent += data.Description;

        data.commentaires.forEach(commentaire => {
            const commentairesDiv = document.getElementById('commentairesSection');
            commentairesDiv.innerHTML += `
                <div class="bg-white m-2 p-2 rounded-lg shadow-lg flex justify-between items-center">
                    <div class="w-[80%]">
                        <p class="font-semibold">${commentaire.user.Prenom} ${commentaire.user.Nom}</p>
                        <p>${commentaire.Commentaire}</p>
                    </div>
                    <div class="w-[20%] flex justify-end items-center">
                    <% if (user.role = "Administrateurs") { %>
                        <a class="delete-comment"><i class="fa-solid fa-trash-can"></i></a>
                    <% } %>
                    </div>
                </div>
            `;
        });


        document.querySelectorAll('.delete-comment').forEach(element => {
            element.addEventListener('click', async (e) => {
                const commentId = e.target.dataset.id;
                try {
                    const response = await fetch(`/api/commentaires/${commentId}`, {
                        method: 'DELETE',
                        headers: { 'Content-Type': 'application/json' },
                    });

                    if (!response.ok) {
                        throw new Error('Erreur lors de la suppression du commentaire.');
                    }

                    // Supprimer le commentaire de l'interface utilisateur
                    e.target.closest('div.bg-white').remove();
                } catch (error) {
                    console.error('Erreur :', error);
                    window.alert('Une erreur est survenue. Veuillez réessayer.');
                }
            });
        });

    })
    .catch(error => {
        console.error('Erreur :', error);
    });


    const commentForm = document.getElementById('commentForm');

    commentForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const idCompte = document.getElementById('ID_Compte').value;
        const commentaireTexte = document.getElementById('Texte').value;

        try {
            const response = await fetch(`/api/produits/${produitID}/commentaires`, {
                method: 'POST',
                body: JSON.stringify({
                    ID_Compte: idCompte,
                    Contenu: commentaireTexte
                }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) {
                throw new Error('Erreur lors de l\'envoi du commentaire.');
            }

            // Afficher une alerte avec le message de retour
            window.alert(`Commentaire envoyé avec succès`);

            // Réinitialiser le formulaire
            e.target.reset();
            window.location.reload();
        } catch (error) {
            console.error('Erreur :', error);
            window.alert('Une erreur est survenue. Veuillez réessayer.');
        }
    });

});