document.addEventListener('DOMContentLoaded', function() {

    document.getElementById('contactForm').addEventListener('submit', async (e) => {
        e.preventDefault(); // Empêche l'envoi classique du formulaire

        const formData = new FormData(e.target);
        
        try {
            const response = await fetch('/contact', {
                method: 'POST',
                body: JSON.stringify({
                    name: formData.get('name'),
                    email: formData.get('email'),
                    message: formData.get('message'),
                }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) {
                throw new Error('Erreur lors de l\'envoi du message.');
            }

            const result = await response.json();

            // Afficher une alerte avec le message de retour
            window.alert(`
                ${result.message}
                
                Rappel
                De : ${result.data.name} (${result.data.email})
                Message : ${result.data.message}
                `);

            // Réinitialiser le formulaire
            e.target.reset();
        } catch (error) {
            console.error('Erreur :', error);
            window.alert('Une erreur est survenue. Veuillez réessayer.');
        }
    });
});