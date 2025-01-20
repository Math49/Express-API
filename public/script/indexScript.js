document.addEventListener('DOMContentLoaded', function() {

    fetch('/api/produits',{
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des produits');
        }
        return response.json(); // Les données JSON retournées par le serveur
    })
    .then(data => {
        console.log('Produits récupérés :', data);

        // Afficher les données sur la page
        const produitsDiv = document.getElementById('produits');
        //seulement les 5 prem

        data = data.slice(0,4);

        produitsDiv.innerHTML = data.map(produit => `
            <div class="h-[40vh] w-[20vw] bg-white m-2 rounded-lg shadow-lg overflow-hidden">
                <div class="bg-bonbon h-[20vh]"></div>
                <div class="p-3 flex flex-col justify-between gap-2">
                    <h2 class="text-[20px] font-semibold underline-pink">${produit.Label}</h2>
                    <p class="opacity-75">${produit.Marque}</p>
                    <p class="text-xl font-bold underline-yellow w-full text-end">${produit.Prix_HT}€</p>
                </div>
            </div>
        `).join('');
    })
    .catch(error => {
        console.error('Erreur :', error);
    });
});