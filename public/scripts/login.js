console.log('Script login chargé !');
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault(); // Empêche la soumission classique du formulaire

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        if (data.token) {

            // Rediriger vers une autre page
            window.location.href = '/';
        } else {
            alert('Erreur : ' + data.error);
        }
    } catch (err) {
        console.error('Erreur lors de la connexion :', err);
    }
});