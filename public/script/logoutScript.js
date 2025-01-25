document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('logout').addEventListener('click', async () => {
        try {
            const response = await fetch('/api/logout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la déconnexion.');
            }

            window.location.href = '/';
        } catch (error) {
            console.error('Erreur :', error);
            window.alert('Une erreur est survenue. Veuillez réessayer.');
        }
    });
});