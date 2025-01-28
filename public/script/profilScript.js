document.addEventListener('DOMContentLoaded', function() {

    const userID = document.getElementById('userID').value;

    let disabled = true;

    fetch('/api/users/' + userID)
        .then(response => response.json())
        .then(data => {
            
            
            console.log(data);
            document.getElementById('userEmail').value = data.Email;
            document.getElementById('userNom').value = data.Nom;
            document.getElementById('userPrenom').value = data.Prenom;

            const userRoleSelect = document.getElementById('userRole');
            for (let i = 0; i < userRoleSelect.options.length; i++) {
                if (userRoleSelect.options[i].value === data.Role) {
                    userRoleSelect.selectedIndex = i;
                    break;
                }
            }

        });


    document.getElementById('updateUser').addEventListener('click', function() {
        

        if (disabled) {
            document.getElementById('userEmail').disabled = false;
            document.getElementById('userNom').disabled = false;
            document.getElementById('userPrenom').disabled = false;
            
            document.getElementById('userSubmit').style.display = 'block';

            disabled = false;
        } else {
            document.getElementById('userEmail').disabled = true;
            document.getElementById('userNom').disabled = true;
            document.getElementById('userPrenom').disabled = true;

            document.getElementById('userSubmit').style.display = 'none';

            disabled = true;
        }

    });

    document.getElementById('userSubmit').addEventListener('click', function() {

        fetch('/api/users/' + userID, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Email: document.getElementById('userEmail').value,
                Nom: document.getElementById('userNom').value,
                Prenom: document.getElementById('userPrenom').value,
                Role: document.getElementById('userRole').value
            })
        })

    });


});