function setupUI(user) {
    const loginForm = document.getElementById('login-form');
    const authenticationBar = document.getElementById('authentication-bar');
    const userDetails = document.getElementById('user-details');
    const controlPanel = document.getElementById('control-panel');  // Référence des boutons de contrôle
    const robotGrid = document.getElementById('robot-grid');        // Référence des cartes de robots

    if (user) {
        // Si l'utilisateur est connecté
        console.log("Utilisateur connecté : ", user.email);
        loginForm.style.display = 'none';           // Masquer le formulaire de connexion
        authenticationBar.style.display = 'block';  // Afficher la barre d'authentification
        userDetails.innerText = user.email;         // Afficher l'email de l'utilisateur
        robotGrid.style.display = 'grid';           // Afficher la grille des robots
        controlPanel.style.display = 'none';        // Masquer les boutons de contrôle (avant la sélection d'un robot)
        loadRobots();                               // Charger les cartes de robots
    } else {
        // Si l'utilisateur est déconnecté
        console.log("Utilisateur non connecté.");
        loginForm.style.display = 'block';          // Afficher le formulaire de connexion
        authenticationBar.style.display = 'none';   // Masquer la barre d'authentification
        controlPanel.style.display = 'none';        // Masquer les boutons de contrôle
        robotGrid.style.display = 'none';           // Masquer la grille des robots
    }
}

document.addEventListener("DOMContentLoaded", function() {
    // Écouter les changements d'état de l'authentification
    auth.onAuthStateChanged(user => {
        if (user) {
            console.log("User is logged in");
            setupUI(user);  // Mettre à jour l'interface après connexion
        } else {
            console.log("User is logged out");
            setupUI();      // Mettre à jour l'interface après déconnexion
        }
    });

    // Gestion du login
    const loginForm = document.querySelector('#login-form');
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Récupérer les informations de connexion
        const email = loginForm['input-email'].value;
        const password = loginForm['input-password'].value;

        console.log("Tentative de connexion avec : ", email);
        
        // Connexion de l'utilisateur
        auth.signInWithEmailAndPassword(email, password).then((cred) => {
            // Réinitialiser le formulaire de connexion après connexion réussie
            console.log("Connexion réussie avec : ", cred.user.email);
            loginForm.reset();
            document.getElementById("error-message").innerText = '';  // Réinitialiser le message d'erreur
        }).catch((error) => {
            console.error("Erreur lors de la connexion : ", error.message);
            document.getElementById("error-message").innerText = error.message;  // Afficher le message d'erreur
        });
    });

    // Gestion du logout
    const logout = document.querySelector('#logout-link');
    logout.addEventListener('click', (e) => {
        e.preventDefault();
        auth.signOut().then(() => {
            console.log("Déconnexion réussie.");
        }).catch((error) => {
            console.error("Erreur lors de la déconnexion : ", error.message);
        });
    });
});
