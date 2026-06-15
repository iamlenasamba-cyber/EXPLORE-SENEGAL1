const stockage = "http://localhost:3000";

export function initAuth() {

    const login = document.querySelector(".COlogin");
    const password = document.querySelector(".COpassword");
    const button = document.querySelector(".connection");
    const inscrip = document.querySelector(".ouvrir-inscription");

    if (button) {
        button.addEventListener("click", connexion);
    }

    if (inscrip) {
        inscrip.addEventListener("click", () => {
            location.hash = "#/inscription";
        });
    }

    async function connexion(event) {
        event?.preventDefault();

        const loginValue = login.value.trim();
        const passwordValue = password.value.trim();

        if (!loginValue || !passwordValue) {
            alert("Tous les champs sont requis.");
            return;
        }

        try {
            const response = await fetch(
                `${stockage}/users?login=${encodeURIComponent(loginValue)}&password=${encodeURIComponent(passwordValue)}`
            );

            if (!response.ok) {
                throw new Error("Erreur serveur");
            }

            const users = await response.json();

            if (users.length > 0) {
                location.hash = "#/accueil";
            } else {
                alert("Login ou mot de passe incorrect");
            }
        } catch (error) {
            console.error(error);
            alert("Impossible de se connecter.");
        }
    }
}

export function initSignup() {

    const login = document.querySelector(".INlogin");
    const password = document.querySelector(".INpassword");
    const button = document.querySelector(".inscription");
    const RETOURBOUTONN = document.querySelector(".retour-connexion");

    if (button) {
        button.addEventListener("click", inscription);
    }

    if (RETOURBOUTONN) {
        RETOURBOUTONN.addEventListener("click", () => {
            location.hash = "#/login";
        });
    }

    async function inscription(event) {
        event?.preventDefault();

        const loginValue = login.value.trim();
        const motdepassee = password.value.trim();

        if (!loginValue || !motdepassee) {
            alert("Tous les champs sont requis.");
            return;
        }

        try {
            const ALY = await fetch(
                `${stockage}/users?login=${encodeURIComponent(loginValue)}`
            );

            if (!ALY.ok) {
                throw new Error("Erreur serveur");
            }

            const DEJApresent = await ALY.json();

            if (DEJApresent.length > 0) {
                alert("Ce login existe déjà.");
                return;
            }

            const CREER = await fetch(`${stockage}/users`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ login: loginValue, password: motdepassee })
            });

            if (!CREER.ok) {
                throw new Error("Impossible de créer l'utilisateur");
            }

            alert("Inscription réussie. Connectez-vous maintenant.");
            location.hash = "#/login";
        } catch (error) {
            console.error(error);
            alert("Impossible de s'inscrire. Vérifiez que JSON Server est démarré.");
        }
    }
}
