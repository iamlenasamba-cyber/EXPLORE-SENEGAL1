import Login from "./pages/login.js";
import Accueil from "./pages/accueil.js";
import Inscription from "./pages/inscription.js";

const routes = {
    "/login": Login,
    "/accueil": Accueil,
    "/inscription": Inscription
};

export default function router() {

    const path = location.hash.slice(1) || "/login";

    const page = routes[path];

    document.getElementById("app").innerHTML =
        page ? page() : "<h1>404</h1>";

    if (path === "/login" || path === "/inscription") {
        import("./auth.js").then(khadza => {
            if (path === "/login") {
                khadza.initAuth();
            } else {
                khadza.initSignup();
            }
        });
    }

}