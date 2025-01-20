document.addEventListener('DOMContentLoaded', function () {
    let produits = []; // Tous les produits récupérés
    let filteredProduits = []; // Produits filtrés

    // Récupère tous les produits au chargement
    fetch('/api/produits', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des produits');
            }
            return response.json();
        })
        .then(data => {
            produits = data;
            filteredProduits = produits; // Par défaut, tous les produits sont affichés
            displayProduits(filteredProduits);
            generateBrandCheckboxes();
            setupFilterListeners(); // Configure les écouteurs pour les critères de filtre
        })
        .catch(error => {
            console.error('Erreur :', error);
        });

    // Affiche les produits sur la page
    function displayProduits(data) {
        const produitsDiv = document.getElementById('produits');
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
    }

    // Génère les checkboxes pour les marques
    function generateBrandCheckboxes() {
        const brands = [...new Set(produits.map(p => p.Marque))]; // Obtenir les marques uniques
        const brandCheckboxesDiv = document.getElementById('brandCheckboxes');

        brandCheckboxesDiv.innerHTML = brands.map(brand => `
            <div>
                <label>
                    <input type="checkbox" class="brandCheckbox" value="${brand}">
                    ${brand}
                </label>
            </div>
        `).join('');
    }

    // Filtre les produits en fonction des critères
    function applyFilters() {
        const searchLabel = document.getElementById('searchLabel').value.toLowerCase();
        const selectedBrands = Array.from(document.querySelectorAll('.brandCheckbox:checked')).map(cb => cb.value);
        const minPrice = parseFloat(document.getElementById('minPrice').value) || 0;
        const maxPrice = parseFloat(document.getElementById('maxPrice').value) || Infinity;

        filteredProduits = produits.filter(produit => {
            const matchesLabel = produit.Label.toLowerCase().includes(searchLabel);
            const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(produit.Marque);
            const matchesPrice = produit.Prix_HT >= minPrice && produit.Prix_HT <= maxPrice;

            return matchesLabel && matchesBrand && matchesPrice;
        });

        displayProduits(filteredProduits);
    }

    // Configure les écouteurs pour tous les champs de filtre
    function setupFilterListeners() {
        const searchLabelInput = document.getElementById('searchLabel');
        const brandCheckboxes = document.querySelectorAll('.brandCheckbox');
        const minPriceInput = document.getElementById('minPrice');
        const maxPriceInput = document.getElementById('maxPrice');

        // Écouteurs pour les critères de filtre
        searchLabelInput.addEventListener('input', applyFilters); // Barre de recherche
        brandCheckboxes.forEach(cb => cb.addEventListener('change', applyFilters)); // Marques
        minPriceInput.addEventListener('input', applyFilters); // Plage de prix min
        maxPriceInput.addEventListener('input', applyFilters); // Plage de prix max
    }
});
