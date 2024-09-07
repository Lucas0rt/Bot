function setupUI(user) {
    const loginForm = document.getElementById('login-form');
    const authenticationBar = document.getElementById('authentication-bar');
    const userDetails = document.getElementById('user-details');
    const controlPanel = document.getElementById('control-panel');  // Référence des boutons de contrôle

    if (user) {
        // Si l'utilisateur est connecté
        loginForm.style.display = 'none';           // Masquer le formulaire de connexion
        authenticationBar.style.display = 'block';  // Afficher la barre d'authentification
        controlPanel.style.display = 'block';       // Afficher les boutons de contrôle
        userDetails.innerText = user.email;         // Afficher l'email de l'utilisateur
    } else {
        // Si l'utilisateur est déconnecté
        loginForm.style.display = 'block';          // Afficher le formulaire de connexion
        authenticationBar.style.display = 'none';   // Masquer la barre d'authentification
        controlPanel.style.display = 'none';        // Masquer les boutons de contrôle
    }
}


document.addEventListener("DOMContentLoaded", function()
{
    // listen for auth status changes
    auth.onAuthStateChanged(user => {
        if (user) {
          console.log("user logged in");
          console.log(user);
          setupUI(user);
          var uid = user.uid;
          console.log(uid);
        } else {
          console.log("user logged out");
          setupUI();
        }
    });

    // login
    const loginForm = document.querySelector('#login-form');
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // get user info
        const email = loginForm['input-email'].value;
        const password = loginForm['input-password'].value;
        // log the user in
        auth.signInWithEmailAndPassword(email, password).then((cred) => {
            // close the login modal & reset form
            loginForm.reset();
            console.log(email);
        })
        .catch((error) =>{
            const errorCode = error.code;
            const errorMessage = error.message;
            document.getElementById("error-message").innerHTML = errorMessage;
            console.log(errorMessage);
        });
    });

    // logout
    const logout = document.querySelector('#logout-link');
    logout.addEventListener('click', (e) => {
        e.preventDefault();
        auth.signOut();
    });
});  