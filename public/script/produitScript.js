document.addEventListener('DOMContentLoaded', function() {
    
    const produitID = window.location.pathname.split('/').pop();

    console.log(produitID);

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


    })
    .catch(error => {
        console.error('Erreur :', error);
    });

});