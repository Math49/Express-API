document.addEventListener('DOMContentLoaded', function() {
    const version = "v1";
    const produitID = window.location.pathname.split('/').pop();

    let product = null;

    fetch(`/api/${version}/products/${produitID}`,{
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

        product = data;
        console.log(product);
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
                    const response = await fetch(`/api/${version}/commentaires/${commentId}`, {
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
    const idCompte = document.getElementById('ID_Compte').value;

    commentForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const commentaireTexte = document.getElementById('Texte').value;

        try {
            const response = await fetch(`/api/${version}/produits/${produitID}/commentaires`, {
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

    const addcart = document.getElementById('addcart');
    addcart.addEventListener('click', async (e) => {
        console.log(product);
        product = { ...product, ID_Client: idCompte };
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        console.log(cart);
        const existingItem = cart.find(item => item.ID_Produit === product.ID_Produit && item.ID_Client === product.ID_Client);


        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Produit ajouté au panier !');
    });

});