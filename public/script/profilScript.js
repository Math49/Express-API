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
            document.getElementById('userRole').value = data.Role;
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

});