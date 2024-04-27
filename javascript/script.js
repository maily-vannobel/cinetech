// DEBUT ALONZO !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// Variables    !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const url = window.location;
const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZTg2NzAxNjk2NThhZTk3ZDY5OTBjYzhjYzQwZDU0YSIsInN1YiI6IjY2MjYxYThhZTg5NGE2MDE3ZDNjMzRjNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bqPMIPnQxZ_TZREm_GNHPOwRkHflMBDpuVFDFTmteUU";
// Page films   !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

if (url.pathname.includes("films.html")) {
    // VARIABLE DE LA PAGE FILMS
    let pageActuelle = 1;
    const totalDesPages = 200;
    let categorieActuelle = "popular";
    const populaire = document.querySelector(".populaires-btn");
    const mieuxNotes = document.querySelector(".mieux-notes-btn");
    const prochainement = document.querySelector(".prochainement-btn");
    const enCours = document.querySelector(".en-cours-btn");

    // FUNCTION DE LA PAGE FILMS !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    async function filmsFetchParCategoriesEtPage(categorie, page) {
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: "Bearer " + token,
            },
        };
        try {
            const reponse = await fetch(
                `https://api.themoviedb.org/3/movie/${categorie}?language=fr-FR&page=${page}`,
                options
            );

            const data = await reponse.json();
            // console.log(data);
            return data.results;
        } catch (erreur) {
            console.error("Erreur lors du chargement du json", erreur);
            return [];
        }
    }
    async function afficherFilms(categorie, page) {
        const filmsResultat = await filmsFetchParCategoriesEtPage(
            categorie,
            page
        );
        const films = document.querySelector(".films-cards");
        let contenuHTML = "";
        for (let i = 0; i < filmsResultat.length; i++) {
            contenuHTML += `
            <a class="card mb-3 lienCard" style="max-width: 450px; " href="details.html?id=${filmsResultat[i].id}" target="_blank" >
                <div class="row g-0">
                    <div class="col-md-4 notes-img">
                        <img src="https://image.tmdb.org/t/p/w500/${filmsResultat[i].poster_path}" class="img-fluid rounded-start images-cartes" alt="image promotionnelle">
                        <small class="notes">Notes : ${filmsResultat[i].vote_average}</small>
                        </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${filmsResultat[i].title}</h5>
                            <p class="card-text description">Description : ${filmsResultat[i].overview}</p>
                            
                        </div>
                    </div>
                </div>
            </a>`;
        }
        films.innerHTML = contenuHTML;
    }
    function mettreAJourPagination() {
        document.getElementById("page-un").style.display = "block";
        document.getElementById("page-trois").style.display = "block";

        document.getElementById("page-un").textContent = pageActuelle - 1;
        document.getElementById("page-deux").textContent = pageActuelle;
        document.getElementById("page-trois").textContent = pageActuelle + 1;

        if (pageActuelle === 1) {
            document.getElementById("page-un").style.display = "none";
            document.getElementById("page-trois").textContent =
                pageActuelle + 1;
        }

        if (pageActuelle === totalDesPages) {
            document.getElementById("page-trois").style.display = "none";
            document.getElementById("page-un").textContent = pageActuelle - 1;
        }
    }
    //script page films !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    afficherFilms("popular", 1);
    mettreAJourPagination();
    populaire.classList.add("active");

    document.getElementById("page-precedente").addEventListener("click", () => {
        if (pageActuelle > 1) {
            pageActuelle--;
            afficherFilms(categorieActuelle, pageActuelle);
            mettreAJourPagination();
        }
    });
    document.getElementById("page-un").addEventListener("click", () => {
        if (pageActuelle > 1) {
            pageActuelle--;
            afficherFilms(categorieActuelle, pageActuelle);
            mettreAJourPagination();
        }
    });

    document.getElementById("page-trois").addEventListener("click", () => {
        if (pageActuelle < totalDesPages) {
            pageActuelle++;
            afficherFilms(categorieActuelle, pageActuelle);
            mettreAJourPagination();
        }
    });
    document.getElementById("page-suivante").addEventListener("click", () => {
        if (pageActuelle < totalDesPages) {
            pageActuelle++;
            afficherFilms(categorieActuelle, pageActuelle);
            mettreAJourPagination();
        }
    });

    populaire.addEventListener("click", () => {
        populaire.classList.add("active");
        mieuxNotes.classList.remove("active");
        prochainement.classList.remove("active");
        enCours.classList.remove("active");
        categorieActuelle = "popular";
        pageActuelle = 1;
        afficherFilms(categorieActuelle, pageActuelle);
        mettreAJourPagination();
    });

    mieuxNotes.addEventListener("click", () => {
        populaire.classList.remove("active");
        mieuxNotes.classList.add("active");
        prochainement.classList.remove("active");
        enCours.classList.remove("active");
        categorieActuelle = "top_rated";
        pageActuelle = 1;
        afficherFilms(categorieActuelle, pageActuelle);
        mettreAJourPagination();
    });

    prochainement.addEventListener("click", () => {
        populaire.classList.remove("active");
        mieuxNotes.classList.remove("active");
        prochainement.classList.add("active");
        enCours.classList.remove("active");
        categorieActuelle = "upcoming";
        pageActuelle = 1;
        afficherFilms(categorieActuelle, pageActuelle);
        mettreAJourPagination();
    });

    enCours.addEventListener("click", () => {
        populaire.classList.remove("active");
        mieuxNotes.classList.remove("active");
        prochainement.classList.remove("active");
        enCours.classList.add("active");
        categorieCourante = "now_playing";
        pageActuelle = 1;
        afficherFilms(categorieCourante, pageActuelle);
        mettreAJourPagination();
    });
}

// Page series  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

if (url.pathname.includes("series.html")) {
    //VARIABLES DE LA PAGE SERIES
    let pageActuelle = 1;
    const totalDesPages = 200;
    let categorieActuelle = "popular";
    const populaire = document.querySelector(".populaires-btn");
    const mieuxNotes = document.querySelector(".mieux-notes-btn");
    const enDirect = document.querySelector(".en-direct-btn");
    const aSuivre = document.querySelector(".aujourdhui-btn");
    //FUNCTION DE LA PAGE SERIES
    async function seriesFetchParCategoriesEtPage(categorie, page) {
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: "Bearer " + token,
            },
        };
        try {
            const reponse = await fetch(
                `https://api.themoviedb.org/3/tv/${categorie}?language=fr-FR&page=${page}`,
                options
            );

            const data = await reponse.json();
            // console.log(data);
            return data.results;
        } catch (erreur) {
            console.error("Erreur lors du chargement du json", erreur);
            return [];
        }
    }
    async function afficherSeries(categorie, page) {
        const seriesResultat = await seriesFetchParCategoriesEtPage(
            categorie,
            page
        );
        const series = document.querySelector(".series-cards");
        let contenuHTML = "";
        for (let i = 0; i < seriesResultat.length; i++) {
            contenuHTML += `
            <div class="card mb-3" style="max-width: 450px;">
                <div class="row g-0">
                    <div class="col-md-4 notes-img" data-tv-id="${seriesResultat[i].id}">
                        <img src="https://image.tmdb.org/t/p/w500/${seriesResultat[i].poster_path}" class="img-fluid rounded-start images-cartes" alt="image promotionnelle">
                        <small class="notes">Notes : ${seriesResultat[i].vote_average}</small>
                        </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${seriesResultat[i].name}</h5>
                            <p class="card-text description">Description : ${seriesResultat[i].overview}</p>
                            
                        </div>
                    </div>
                </div>
            </div>`;
        }
        series.innerHTML = contenuHTML;
    }
    function mettreAJourPagination() {
        document.getElementById("page-un").style.display = "block";
        document.getElementById("page-trois").style.display = "block";

        document.getElementById("page-un").textContent = pageActuelle - 1;
        document.getElementById("page-deux").textContent = pageActuelle;
        document.getElementById("page-trois").textContent = pageActuelle + 1;

        if (pageActuelle === 1) {
            document.getElementById("page-un").style.display = "none";
            document.getElementById("page-trois").textContent =
                pageActuelle + 1;
        }

        if (pageActuelle === totalDesPages) {
            document.getElementById("page-trois").style.display = "none";
            document.getElementById("page-un").textContent = pageActuelle - 1;
        }
    }
    // SCRIPT DE LA PAGE SERIES
    afficherSeries("popular", 1);
    populaire.classList.add("active");

    document.getElementById("page-precedente").addEventListener("click", () => {
        if (pageActuelle > 1) {
            pageActuelle--;
            afficherSeries(categorieActuelle, pageActuelle);
            mettreAJourPagination();
        }
    });
    document.getElementById("page-un").addEventListener("click", () => {
        if (pageActuelle > 1) {
            pageActuelle--;
            afficherSeries(categorieActuelle, pageActuelle);
            mettreAJourPagination();
        }
    });

    document.getElementById("page-trois").addEventListener("click", () => {
        if (pageActuelle < totalDesPages) {
            pageActuelle++;
            afficherSeries(categorieActuelle, pageActuelle);
            mettreAJourPagination();
        }
    });
    document.getElementById("page-suivante").addEventListener("click", () => {
        if (pageActuelle < totalDesPages) {
            pageActuelle++;
            afficherSeries(categorieActuelle, pageActuelle);
            mettreAJourPagination();
        }
    });

    populaire.addEventListener("click", () => {
        populaire.classList.add("active");
        mieuxNotes.classList.remove("active");
        enDirect.classList.remove("active");
        aSuivre.classList.remove("active");
        categorieActuelle = "popular";
        pageActuelle = 1;
        afficherSeries(categorieActuelle, pageActuelle);
        mettreAJourPagination();
    });

    mieuxNotes.addEventListener("click", () => {
        populaire.classList.remove("active");
        mieuxNotes.classList.add("active");
        enDirect.classList.remove("active");
        aSuivre.classList.remove("active");
        categorieActuelle = "top_rated";
        pageActuelle = 1;
        afficherSeries(categorieActuelle, pageActuelle);
        mettreAJourPagination();
    });

    enDirect.addEventListener("click", () => {
        populaire.classList.remove("active");
        mieuxNotes.classList.remove("active");
        enDirect.classList.add("active");
        aSuivre.classList.remove("active");
        categorieActuelle = "on_the_air";
        pageActuelle = 1;
        afficherSeries(categorieActuelle, pageActuelle);
        mettreAJourPagination();
    });

    aSuivre.addEventListener("click", () => {
        populaire.classList.remove("active");
        mieuxNotes.classList.remove("active");
        enDirect.classList.remove("active");
        aSuivre.classList.add("active");
        categorieCourante = "airing_today";
        pageActuelle = 1;
        afficherSeries(categorieCourante, pageActuelle);
        mettreAJourPagination();
    });

    mettreAJourPagination();
}
if (url.pathname.includes("inscription.html")) {
    async function fetchRequestToken() {
        const options = {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + token,
            },
        };

        try {
            const response = await fetch(
                "https://api.themoviedb.org/3/authentication/token/new",
                options
            );
            if (!response.ok) {
                throw new Error(
                    `Failed to fetch data with status ${response.status}`
                );
            }
            const jsonData = await response.json();
            const requestToken = jsonData.request_token;
            document.querySelector(".text-info-creation").textContent =
                "Jeton: " + requestToken;
            return requestToken;
        } catch (error) {
            console.error("Error fetching data: ", error.message);
            return null;
        }
    }

    document
        .querySelector(".obtenir-jeton")
        .addEventListener("click", async event => {
            event.preventDefault();
            const requestToken = await fetchRequestToken();
            if (requestToken) {
                window.open(
                    `https://www.themoviedb.org/authenticate/${requestToken}`,
                    "_blank"
                );
            } else {
                console.error("Failed to retrieve the request token.");
            }
        });

    async function fetchCreatSession() {
        const jeton = document.querySelector(".user-box input").value;
        const utilisateur = {
            request_token: jeton,
        };
        const options = {
            method: "POST",
            headers: {
                accept: "application/json",
                "content-type": "application/json",
                Authorization: "Bearer " + token,
            },
            body: JSON.stringify(utilisateur),
        };
        try {
            const reponse = await fetch(
                "https://api.themoviedb.org/3/authentication/session/new",
                options
            );
            if (reponse.ok) {
                const jsonData = await reponse.json();
                console.log("Compte créé avec succès:", jsonData);

                const sessionID = jsonData.session_id;
                document.querySelector(".text-info-creation").textContent =
                    "Compte créer avec succés, voici votre id de connexion :  " +
                    sessionID;

                return jsonData.session_id;
            } else {
                throw new Error(
                    `Échec de la création du compte avec le statut ${reponse.status}`
                );
            }
        } catch (erreur) {
            console.error("Erreur lors du chargement des données", erreur);
            return null;
        }
    }

    document.querySelector(".creer-un-compte").addEventListener("click", () => {
        fetchCreatSession();
    });
}
// autocompletion // barre de recherche !!!!!!!!!!!!!!!!!
class rechercheAutoCompletion {
    constructor() {
        this.barreDeRecherche = document.querySelector("#recherche");
        this.conteneurResultatsRecherche = document.querySelector(
            ".resultatsRecherche"
        );

        // Attacher l'écouteur d'événements
        this.barreDeRecherche.addEventListener("input", () =>
            this.activerSaisieUtilisateurs()
        );
    }

    async recupererDonneesMulti(query) {
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: "Bearer " + token,
            },
        };
        try {
            const reponse = await fetch(
                `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(
                    query
                )}&include_adult=true&language=fr-FR&page=1`,
                options
            );
            if (reponse.ok) {
                const donneesJson = await reponse.json();
                return donneesJson.results;
            } else {
                throw new Error(
                    `Échec de la récupération des données avec le statut ${reponse.status}`
                );
            }
        } catch (erreur) {
            console.error("Erreur lors du chargement des données", erreur);
            return [];
        }
    }

    obtenirTitre(element) {
        return element.title || element.original_name || "Titre inconnu";
    }

    async activerSaisieUtilisateurs() {
        if (this.barreDeRecherche.value.length <= 1) {
            document.querySelector(".resultatContainer").innerHTML = "";
            return;
        }
        if (this.barreDeRecherche.value.length > 1) {
            try {
                const resultats = await this.recupererDonneesMulti(
                    this.barreDeRecherche.value
                );
                const resultatsRecherche =
                    document.querySelector(".resultatContainer");

                let contenuHTML = "";
                for (let i = 0; i < resultats.length; i++) {
                    const titre = this.obtenirTitre(resultats[i]);
                    contenuHTML += this.genererCarteHTML(resultats[i], titre);
                }
                resultatsRecherche.innerHTML = contenuHTML;
            } catch (erreur) {
                console.error(
                    "Erreur lors de la récupération des résultats de recherche",
                    erreur
                );
                this.conteneurResultatsRecherche.innerHTML =
                    "<li>Erreur lors de la recherche</li>";
            }
        }
    }

    // Méthode pour générer le HTML pour une carte de résultat
    genererCarteHTML(resultat, titre) {
        return `
        <a class="card mb-3 lienCard" style="max-width: 450px;" href="details.html?id=${resultat.id}" target="_blank">
            <div class="row g-0">
                <div class="col-md-4 notes-img">
                    <img src="https://image.tmdb.org/t/p/w500/${resultat.poster_path}" class="img-fluid rounded-start images-cartes" alt="image promotionnelle">
                    <small class="notes">Notes : ${resultat.vote_average}</small>
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${titre}</h5>
                        <p class="card-text description">Description : ${resultat.overview}</p>
                    </div>
                </div>
            </div>
        </a>`;
    }
}
class PageManager {
    constructor() {
        this.header = document.querySelector(".header");
        this.footer = document.querySelector(".footer");
        this.buttonBackToTop = document.querySelector(".back-to-top"); // S'assurer que ce sélecteur correspond à un élément dans votre HTML
        this.headerContent();
        this.footerContent();
        this.setupBackToTopButton();
        this.addScrollListener();
    }

    headerContent() {
        const headerContent = `<nav class="navbar navbar-expand-lg">
            <div class="container-fluid">
                <a class="navbar-brand" href="index.html"><img class="logo-du-site" alt="logo" src="assets/images/lunettes.png">  Cinétech</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
                <div class="collapse navbar-collapse " id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0 liens-navbar">
                        <li class="nav-item"><a class="nav-link" href="index.html">Accueil</a></li>
                        <li class="nav-item"><a class="nav-link" href="films.html">Films</a></li>
                        <li class="nav-item"><a class="nav-link" href="series.html">Series</a></li>
                        <li class="nav-item"><a class="nav-link" href="connexion.html">Connexion</a></li>
                        <li class="nav-item"><a class="nav-link" href="inscription.html">Inscription</a></li>
                    </ul>
                    <form class="d-flex" role="search">
                        <div class="inputbox">
                            <input type="text" required="required" id="recherche" />
                            <span>Recherche</span>
                            <i></i>
                        </div>
                    </form>
                </div>
            </div>
        </nav>`;
        this.header.innerHTML = headerContent;
    }
    footerContent() {
        const footerContent = `<!-- Grid container -->
        <div class="container p-4">
            <!--Grid row-->
            <div class="row">
                <!--Grid column-->
                <div class="col-lg-6 col-md-12 mb-4 mb-md-0">
                    <div class="titleFooter">
                        <p class="cine-footer">Ciné</p>
                        <p class="tech-footer">tech</p>
                    </div>

                    <p class="text-footer">
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Iste atque ea quis molestias. Fugiat pariatur
                        maxime quis culpa corporis vitae repudiandae aliquam
                        voluptatem veniam, est atque cumque eum delectus
                        sint!
                    </p>
                </div>

                <!--Grid column-->
                <div class="col-lg-6 col-md-6 mb-4 mb-md-6">
                    <h5 class="text-body mb-0">Redirection</h5>

                    <ul class="list-unstyled">
                        <li>
                            <a href="connexion.html" class="text-body"
                                >Connexion</a
                            >
                        </li>
                        <li>
                            <a href="inscription.html" class="text-body"
                                >Inscription</a
                            >
                        </li>

                        <li>
                            <a href="films.html" class="text-body">Films</a>
                        </li>
                        <li>
                            <a href="series.html" class="text-body"
                                >Series</a
                            >
                        </li>
                    </ul>
                </div>
                <!--Grid column-->
            </div>
            <!--Grid row-->
        </div>
        <!-- Grid container -->

        <!-- Copyright -->
        <div
            class="text-center p-3"
            style="background-color: rgba(0, 0, 0, 0.05)"
        >
            © 2003 Copyright:
            <a class="text-body" href="https://mdbootstrap.com/"
                >Cinétech.com</a
            >
        </div>
        <!-- Copyright -->`;
        this.footer.innerHTML = footerContent;
    }

    setupBackToTopButton() {
        this.buttonBackToTop.innerHTML = `<button id="btn-back-to-top" class=" btn-floating " >
        <i  
        class="material-icons icons-arrow-up">keyboard_arrow_up</i>
        </button>`;
        const mybutton = document.getElementById("btn-back-to-top");
        mybutton.style.display = "none"; // Hide initially
        mybutton.addEventListener("click", () => {
            document.body.scrollTop = 0; // For Safari
            document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        });
    }

    addScrollListener() {
        window.onscroll = () => {
            if (
                document.body.scrollTop > 20 ||
                document.documentElement.scrollTop > 20
            ) {
                this.buttonBackToTop.querySelector(
                    "#btn-back-to-top"
                ).style.display = "block";
            } else {
                this.buttonBackToTop.querySelector(
                    "#btn-back-to-top"
                ).style.display = "none";
            }
        };
    }
}

new PageManager();

new rechercheAutoCompletion();
// FIN ALONZO   !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
