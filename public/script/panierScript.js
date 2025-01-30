document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotalElement = document.getElementById('cartTotal');
    const clearCartButton = document.getElementById('clearCart');
    const userID = document.getElementById('userID').value;
    const version = "v1";

    // Charger les articles du panier depuis le localStorage
    const loadCart = () => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartItemsContainer.innerHTML = '';
        let total = 0;

        cart = cart.filter(item => item.ID_Client === userID);

        cart.forEach((item, index) => {
            total += item.Prix_HT * item.quantity;
            cartItemsContainer.innerHTML += `
                <tr>
                    <td class="px-4 py-2 border">${item.Label}</td>
                    <td class="px-4 py-2 border">${item.Prix_HT.toFixed(2)} €</td>
                    <td class="px-4 py-2 border">
                        <input type="number" min="1" value="${item.quantity}" data-index="${index}" class="quantityInput w-16 text-center border border-gray-300 rounded">
                    </td>
                    <td class="px-4 py-2 border">${(item.Prix_HT * item.quantity).toFixed(2)} €</td>
                    <td class="px-4 py-2 border">
                        <button class="removeButton bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded" data-index="${index}">
                            Supprimer
                        </button>
                    </td>
                </tr>
            `;
        });

        cartTotalElement.textContent = total.toFixed(2);
    };

    // Mettre à jour le panier
    const updateCart = () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];

        cart = cart.filter(item => item.Id_Client === userID);

        document.querySelectorAll('.quantityInput').forEach(input => {
            const index = input.dataset.index;
            const quantity = parseInt(input.value);
            if (quantity > 0) {
                cart[index].quantity = quantity;
            }
        });
        localStorage.setItem('cart', JSON.stringify(cart));
        loadCart();
    };

    // Supprimer un article
    const removeItem = (index) => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart = cart.filter(item => item.Id_Client === userID);
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        loadCart();
    };

    // Vider le panier
    clearCartButton.addEventListener('click', () => {
        
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart = cart.filter(item => item.ID_Client !== userID);
        localStorage.setItem('cart', JSON.stringify(cart));

        loadCart();
    });

    // Écouter les changements de quantité
    cartItemsContainer.addEventListener('change', (event) => {
        if (event.target.classList.contains('quantityInput')) {
            updateCart();
        }
    });

    // Écouter les clics sur les boutons de suppression
    cartItemsContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('removeButton')) {
            const index = event.target.dataset.index;
            removeItem(index);
        }
    });

    // Charger le panier au démarrage
    loadCart();


    // validation de la commande
    const validCart = document.getElementById('validCart');

    validCart.addEventListener('click', async () => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const products = cart.filter(item => item.ID_Client === userID);
        try {
            const response = await fetch(`/api/${version}/orders`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ID_Client: userID, produits: products }),
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la validation de la commande.');
            }

            cart = cart.filter(item => item.ID_Client !== userID);

            localStorage.setItem('cart', JSON.stringify([]));
            window.location.href = '/';
            window.alert('Commande validée avec succès !');
        } catch (error) {
            console.error('Erreur :', error);
            window.alert('Une erreur est survenue. Veuillez réessayer.');
        }
    });
});
