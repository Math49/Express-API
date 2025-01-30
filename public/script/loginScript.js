document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const version = "v1";
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch(`/api/${version}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const result = await response.json();

            if (response.ok) {

                // Redirection après connexion réussie
                window.location.href = '/';
            } else {
                alert(result.error || 'Échec de la connexion.');
            }
        } catch (err) {
            console.error('Erreur lors de la connexion :', err);
            alert('Une erreur est survenue. Veuillez réessayer.');
        }
    });
});