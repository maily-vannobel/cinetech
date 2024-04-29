// DEBUT ALONZO !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// Variables    !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const filmContainer = document.querySelector(".filmContainer");
const serieContainer = document.querySelector(".serieContainer");
const filmsContainer = document.querySelector(
    "#carouselExampleIndicators1 .carousel-inner"
);
const seriesContainer = document.querySelector(
    "#carouselExampleIndicators2 .carousel-inner"
);
const btnFilm = document.querySelector(".btnFilm");
const btnSerie = document.querySelector(".btnSerie");
const apiKey = "ae8670169658ae97d6990cc8cc40d54a";
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get("movie_id");
const tvId = urlParams.get("tv_id");
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
            console.log(data);
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
        filmsResultat.forEach(film => {
            const imgPath =
                window.innerWidth >= 768
                    ? film.poster_path
                    : film.backdrop_path;
            contenuHTML += `
            <a class="card mb-3 lienCard" href="details.html?movie_id=${film.id}&type=movie" target="_blank" >
                <div class="row g-0">
                    <div class="col-md-4 notes-img">
                        <img src="https://image.tmdb.org/t/p/w500/${imgPath}" class="img-fluid rounded-start images-cartes" alt="image promotionnelle">
                        <small class="notes">Notes : ${film.vote_average}</small>
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${film.title}</h5>
                            <p class="card-text description">Description : ${film.overview}</p>
                        </div>
                    </div>
                </div>
            </a>`;
        });
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
    window.addEventListener("resize", () => {
        afficherFilms(categorieActuelle, pageActuelle);
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
            console.log(data);
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
        seriesResultat.forEach(serie => {
            const imgPath =
                window.innerWidth >= 768
                    ? serie.poster_path
                    : serie.backdrop_path;
            contenuHTML += `
            <a class="card mb-3" style="max-width: 450px;" href="details.html?tv_id=${serie.id}&type=tv">
                <div class="row g-0">
                    <div class="col-md-4 notes-img" data-tv-id="${serie.id}">
                        <img src="https://image.tmdb.org/t/p/w500/${imgPath}" class="img-fluid rounded-start images-cartes" alt="image promotionnelle">
                        <small class="notes">Notes : ${serie.vote_average}</small>
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${serie.name}</h5>
                            <p class="card-text description">Description : ${serie.overview}</p>
                        </div>
                    </div>
                </div>
            </a>`;
        });
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
    window.addEventListener("resize", () => {
        afficherSeries(categorieActuelle, pageActuelle);
    });
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
        this.conteneurResultatsRecherche =
            document.querySelector(".resultatContainer");

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
            this.conteneurResultatsRecherche.innerHTML = "";
            return;
        }
        if (this.barreDeRecherche.value.length > 1) {
            try {
                const resultats = await this.recupererDonneesMulti(
                    this.barreDeRecherche.value
                );
                let contenuHTML = "";
                for (let i = 0; i < resultats.length; i++) {
                    const titre = this.obtenirTitre(resultats[i]);
                    contenuHTML += this.genererCarteHTML(resultats[i], titre);
                }
                this.conteneurResultatsRecherche.innerHTML = contenuHTML;
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
        const type = resultat.title ? "movie" : "tv"; // Détermine le type en fonction de la présence de la propriété 'title'
        return `
        <a class="lienCard" style="max-width: 450px;" href="details.html?${type}_id=${resultat.id}&type=${type}" target="_blank">

                         ${titre}

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
                        <li class="nav-item"><a class="nav-link" href="favoris.html">Favoris</a></li>
                        <li class="nav-item"><a class="nav-link" href="films.html">Films</a></li>
                        <li class="nav-item"><a class="nav-link" href="series.html">Series</a></li>
                      
                        <li class="nav-item"><a class="nav-link" href="connexion.html">Connexion</a></li>
                    </ul>
                    <form class="d-flex" role="search">
                        <div class="inputbox">
                            <input type="text" required="required" id="recherche" autocomplete="off" />
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
                            <a href="index.html" class="text-body"
                                >Accueil</a
                            >
                        </li>
                        <li>
                            <a href="favoris.html" class="text-body"
                                >Favoris</a
                            >
                        </li>
                       
                        <li>
                            <a href="connexion.html" class="text-body"
                                >Conexion</a
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

// Maïly !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// Maïly !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// Maïly !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// Maïly !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// Maïly !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// Maïly !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// Maïly !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// Maïly !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// Maïly !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
if (url.pathname.includes("details.html")) {
    async function getMovieDetails(movieId) {
        const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=fr`;
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error("Échec de la récupération des détails du film");
            }
            const data = await response.json();
            return data; // Retourne les détails du film
        } catch (error) {
            console.error(
                "Erreur lors de la récupération des détails du film :",
                error
            );
            return null;
        }
    }

    // AFFICHER DETAILS DU FILMS SUR LA PAGE
    async function displayMovieDetails() {
        if (movieId) {
            // Récupère les détails du film
            const movieDetails = await getMovieDetails(movieId);
            console.log(movieDetails);

            if (movieDetails) {
                // recup element + les affiche
                const movieTitleElement = document.getElementById("movieTitle");
                const movieOverviewElement =
                    document.getElementById("movieOverview");
                const movieReleaseDateElement =
                    document.getElementById("movieReleaseDate");
                const movieRuntime = document.getElementById("movieRuntime");
                const moviePosterElement =
                    document.getElementById("moviePoster");
                const movieStatusElement =
                    document.getElementById("movieStatus");
                const movieCountryElement =
                    document.getElementById("movieCountry");
                const movieVoteAverageElement =
                    document.getElementById("movieVote");

                movieTitleElement.textContent = movieDetails.title;
                movieOverviewElement.textContent = movieDetails.overview;
                movieReleaseDateElement.textContent = movieDetails.release_date;
                movieRuntime.textContent = movieDetails.runtime;
                moviePosterElement.src = `https://image.tmdb.org/t/p/original${movieDetails.poster_path}`;
                movieStatusElement.textContent = movieDetails.status;
                movieCountryElement.textContent = movieDetails.origin_country;
                movieVoteAverageElement.textContent = movieDetails.vote_average;
            } else {
                console.error("Détails du film non trouvés");
            }
        } else {
            console.error("ID du film non spécifié dans l'URL");
        }
    }

    async function getMovieImages(movieId) {
        const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}/images?api_key=${apiKey}`;
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error("Échec de la récupération des images du film");
            }
            const imageData = await response.json();
            console.log("Image data:", imageData); // Log pour vérifier la réponse de l'API
            return imageData.backdrops; // Retourne les données des images du film
        } catch (error) {
            console.error(
                "Erreur lors de la récupération des images du film :",
                error
            );
            return null; // En cas d'erreur, retourne null
        }
    }

    async function displayMovieImages() {
        if (movieId) {
            const movieImages = await getMovieImages(movieId);
            const imagesContainer = document.getElementById("movieImages");
            if (movieImages) {
                movieImages.forEach(backdrop => {
                    const imageElement = document.createElement("img");
                    imageElement.src = `https://image.tmdb.org/t/p/original${backdrop.file_path}`;
                    imageElement.alt = "Backdrop Image";
                    imagesContainer.appendChild(imageElement);
                });
            } else {
                console.error("Images du film non trouvées");
            }
        } else {
            console.error("ID du film non spécifié dans l'URL");
        }
    }

    async function getMovieReview(movieId) {
        const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${apiKey}&language=fr`;
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error("Failed to fetch movie reviews");
            }
            const data = await response.json();
            return data.results; // Retourne les critiques du film
        } catch (error) {
            console.error("Error fetching movie reviews:", error);
            return null;
        }
    }

    async function displayMovieReview() {
        const movieReviewElement = document.getElementById("movieReview");

        if (movieId && movieReviewElement) {
            // Récupère les critiques du film
            const movieReviews = await getMovieReview(movieId);

            if (movieReviews && movieReviews.length > 0) {
                // Crée un élément de liste non ordonnée pour afficher les critiques
                const ul = document.createElement("ul");

                // Parcourt chaque critique pour créer un élément de liste pour chaque
                movieReviews.forEach(review => {
                    const li = document.createElement("li");
                    li.textContent = review.content;
                    ul.appendChild(li);
                });

                movieReviewElement.appendChild(ul);
            } else {
                movieReviewElement.textContent =
                    "Aucune critique disponible pour ce film, n'hésitez pas à écrire la première !";
            }
        } else {
            console.error(
                "ID du film non spécifié dans l'URL ou élément movieReview introuvable"
            );
        }
    }

    async function addRating(movieId, rating) {
        const options = {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=utf-8",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ value: rating }),
        };
        const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}/rating?api_key=${apiKey}`;
        try {
            const response = await fetch(apiUrl, options);
            if (!response.ok) {
                throw new Error("Failed to add rating to the movie");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error adding rating to the movie:", error);
            return null;
        }
    }

    document
        .getElementById("ratingForm")
        .addEventListener("submit", async function (event) {
            event.preventDefault();
            // Récup la note saisie par l'utilisateur
            const ratingInput = document.getElementById("ratingInput").value;

            try {
                const response = await addRating(movieId, ratingInput);
                console.log("Rating added successfully:", response);
            } catch (error) {
                console.error("Error adding rating to the movie:", error);
            }
        });

    async function getTvDetails(tvId) {
        const apiUrl = `https://api.themoviedb.org/3/tv/${tvId}?language=fr&api_key=${apiKey}`;
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(
                    "Échec de la récupération des détails de la série TV"
                );
            }
            const data = await response.json();
            return data; // Retourne les détails de la série TV
        } catch (error) {
            console.error(
                "Erreur lors de la récupération des détails de la série TV :",
                error
            );
            return null; // En cas d'erreur, retourne null
        }
    }

    async function displayTvDetails() {
        if (tvId) {
            // Récupère les détails de la série TV
            const tvDetails = await getTvDetails(tvId);
            const seasons = await getTvSeasons(tvId);

            if (tvDetails) {
                // Récupère les éléments HTML où afficher les détails de la série TV
                const tvTitleElement = document.getElementById("tvTitle");
                const tvOverviewElement = document.getElementById("tvOverview");
                const tvReleaseDateElement =
                    document.getElementById("tvReleaseDate");
                const tvStatusElement = document.getElementById("tvStatus");
                const tvCountryElement = document.getElementById("tvCountry");
                // const tvRuntimeElement = document.getElementById('tvRuntime')
                const tvPoster = document.getElementById("tvPoster");

                // Affiche les détails de la série TV sur la page
                tvTitleElement.textContent = tvDetails.name;
                tvOverviewElement.textContent = tvDetails.overview;
                tvReleaseDateElement.textContent = tvDetails.first_air_date;
                tvStatusElement.textContent = tvDetails.status;
                tvCountryElement.textContent = tvDetails.origin_country;
                // tvRuntimeElement.textContent = tvDetails.episode_run_time
                tvPoster.src = `https://image.tmdb.org/t/p/original${tvDetails.poster_path}`;

                console.log(tvDetails);
            } else {
                console.error("Détails de la série TV non trouvés");
            }
        } else {
            console.error("ID de la série TV non spécifié dans l'URL");
        }
    }

    async function getTvReviews(tvId) {
        const apiUrl = `https://api.themoviedb.org/3/tv/${tvId}/reviews?api_key=${apiKey}&language=fr&page=1`;
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error("Failed to fetch tv show reviews");
            }
            const data = await response.json();
            return data.results; //
        } catch (error) {
            console.error("Error fetching tv show reviews:", error);
            return null;
        }
    }

    async function displayTvReviews(tvId) {
        const reviewsContainer = document.getElementById("tvReviews"); // Obtient l'élément où afficher les critiques
        reviewsContainer.innerHTML = ""; // Vide le conteneur des critiques précédentes

        // Appelle la fonction pour récupérer les critiques de la série TV
        const reviews = await getTvReviews(tvId);

        if (reviews && reviews.length > 0) {
            // Crée un élément de liste non ordonnée pour afficher les critiques
            const ul = document.createElement("ul");

            // Parcourt chaque critique pour créer un élément de liste pour chaque
            reviews.forEach(review => {
                const li = document.createElement("li");
                li.textContent = review.content;
                ul.appendChild(li);
            });

            // Ajoute la liste des critiques à l'élément conteneur
            reviewsContainer.appendChild(ul);
        } else {
            // Affiche un message si aucune critique n'a été trouvée
            reviewsContainer.textContent =
                "Aucune critique disponible pour cette série TV.";
        }
    }

    async function getTvSeason(tvId, seasonNumber) {
        const apiUrl = `https://api.themoviedb.org/3/tv/${tvId}/season/${seasonNumber}?api_key=${apiKey}&language=fr`;

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(
                    "Échec de la récupération des détails de la saison de la série TV"
                );
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(
                "Erreur lors de la récupération des détails de la saison de la série TV :",
                error
            );
            return null;
        }
    }

    async function getTvSeasons(tvId) {
        const apiUrl = `https://api.themoviedb.org/3/tv/${tvId}/season/1?api_key=${apiKey}&language=fr`;

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(
                    "Échec de la récupération des saisons de la série TV"
                );
            }
            const data = await response.json();
            const totalSeasons = data.number_of_seasons;
            const seasons = [];

            for (let i = 1; i <= totalSeasons; i++) {
                const seasonUrl = `https://api.themoviedb.org/3/tv/${tvId}/season/${i}?api_key=${apiKey}&language=fr`;
                const seasonResponse = await fetch(seasonUrl);
                if (!seasonResponse.ok) {
                    throw new Error(
                        `Échec de la récupération de la saison ${i} de la série TV`
                    );
                }
                const seasonData = await seasonResponse.json();
                seasons.push(seasonData);
            }

            return seasons;
        } catch (error) {
            console.error(
                "Erreur lors de la récupération des saisons de la série TV :",
                error
            );
            return null;
        }
    }

    async function displayTvSeasons(tvId, seasonsNumber) {
        const seasonsContainer = document.getElementById("tvSeasons");

        if (seasons && seasons.length > 0) {
            seasons.forEach(season => {
                const seasonElement = document.createElement("div");
                seasonElement.classList.add("season");
                seasonElement.innerHTML = `
        <h3>Saison ${season.season_number}</h3>
        <p>Date de diffusion : ${season.air_date}</p>
        <p>Nombre d'épisodes : ${season.episode_count}</p>
        <p>Résumé : ${season.overview}</p>
      `;
                seasonsContainer.appendChild(seasonElement);
            });
        } else {
            seasonsContainer.innerHTML = "<p>Aucune saison trouvée.</p>";
        }
    }
    async function getTvSeasonDetails(tvId, seasonNumber) {
        const apiUrl = `https://api.themoviedb.org/3/tv/${tvId}/season/${seasonNumber}?api_key=${apiKey}&language=fr`;

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(
                    "Échec de la récupération des détails de la saison de la série TV"
                );
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(
                "Erreur lors de la récupération des détails de la saison de la série TV :",
                error
            );
            return null;
        }
    }
    async function displayTvSeasonDetails(tvId, seasonNumber) {
        // Récupère les détails de la série TV pour obtenir le nombre de saisons
        const tvDetails = await getTvDetails(tvId);

        if (tvDetails && tvDetails.number_of_seasons) {
            // Obtient le nombre total de saisons de la série TV
            const numberOfSeasons = tvDetails.number_of_seasons;

            const seasonsContainer = document.getElementById("tvSeasons"); // Obtient l'élément où afficher les détails des saisons
            seasonsContainer.innerHTML = ""; // Vide le conteneur des détails des saisons précédentes

            // Appelle la fonction pour récupérer les détails de chaque saison de la série TV
            for (let i = 1; i <= numberOfSeasons; i++) {
                try {
                    const seasonDetails = await getTvSeasonDetails(tvId, i); // Récupère les détails de la saison actuelle
                    if (seasonDetails) {
                        const seasonElement = document.createElement("div");
                        seasonElement.innerHTML = `<p><strong>Saison ${i}</strong></p><p>${seasonDetails.overview}</p>`;
                        seasonsContainer.appendChild(seasonElement);
                    } else {
                        console.error(`Détails de la saison ${i} non trouvés`);
                    }
                } catch (error) {
                    console.error(
                        `Erreur lors de la récupération des détails de la saison ${i} :`,
                        error
                    );
                }
            }
        } else {
            console.error(
                "Impossible de récupérer le nombre de saisons pour la série TV"
            );
        }
    }

    // Appeller fonctions
    document.addEventListener("DOMContentLoaded", async function () {
        await displayMovieDetails();
        await displayTvDetails();
        await displayMovieReview();
        await displayTvReviews(tvId);
        await displayTvSeason();
        await displayTvSeasonDetails(tvId, seasonNumber);
    });
    document.addEventListener("DOMContentLoaded", function () {
        // Fonction pour obtenir les paramètres d'URL
        function getUrlParameter(name) {
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
            var results = regex.exec(location.search);
            return results === null
                ? ""
                : decodeURIComponent(results[1].replace(/\+/g, " "));
        }

        // Récupérer le type de contenu à partir des paramètres d'URL
        var contentType = getUrlParameter("type");

        // Afficher la section appropriée en fonction du type de contenu
        if (contentType === "movie") {
            document.getElementById("movieSection").style.display = "block";
            document.getElementById("tvSection").style.display = "none";
        } else if (contentType === "tv") {
            document.getElementById("movieSection").style.display = "none";
            document.getElementById("tvSection").style.display = "block";
        }
    });
}

// Aaliyah !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// Aaliyah !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// Aaliyah !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// Aaliyah !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// Aaliyah !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// Aaliyah !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// Aaliyah !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// Aaliyah !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// Aaliyah !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// Aaliyah !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
if (url.pathname.includes("index.html")) {
    const filmsContainer = document.querySelector("#carouselFilms");
    const seriesContainer = document.querySelector("#carouselSeries");
    async function filmAccueil() {
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: "Bearer " + token,
            },
        };

        try {
            const response = await fetch(
                "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=fr-FR&page=1&sort_by=popularity.desc",
                options
            );

            const data = await response.json();
            return data.results;
        } catch (error) {
            console.error("Erreur lors du chargement du JSON", error);
            return [];
        }
    }

    async function filmAffiche() {
        const films = await filmAccueil();
        filmsContainer.innerHTML = "";

        let carouselInnerHTML = "";
        let currentIndex = 0;

        films.forEach((film, index) => {
            if (index % 3 === 0) {
                if (index !== 0) {
                    filmsContainer.innerHTML += createCarouselItem(
                        carouselInnerHTML,
                        currentIndex === 0
                    );
                    carouselInnerHTML = "";
                    currentIndex++;
                }
            }

            carouselInnerHTML += createCard(film);
        });

        filmsContainer.innerHTML += createCarouselItem(
            carouselInnerHTML,
            currentIndex === 0
        );
    }

    async function seriesAccueil() {
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: "Bearer " + token,
            },
        };

        try {
            const response = await fetch(
                "https://api.themoviedb.org/3/tv/popular?language=fr-FR&page=1",
                options
            );

            const data = await response.json();
            return data.results;
        } catch (error) {
            console.error("Erreur lors du chargement du JSON", error);
            return [];
        }
    }

    async function seriesAffiche() {
        const series = await seriesAccueil();

        seriesContainer.innerHTML = "";

        let carouselInnerHTML = "";
        let currentIndex = 0;

        series.forEach((serie, index) => {
            if (index % 3 === 0) {
                if (index !== 0) {
                    seriesContainer.innerHTML += createCarouselItem(
                        carouselInnerHTML,
                        currentIndex === 0
                    );
                    carouselInnerHTML = "";
                    currentIndex++;
                }
            }

            carouselInnerHTML += createCard(serie);
        });

        seriesContainer.innerHTML += createCarouselItem(
            carouselInnerHTML,
            currentIndex === 0
        );
    }

    function createCard(data) {
        const { title, name, vote_average, poster_path } = data;
        const mediaTitle = title || name;

        return `
        <div class="col-md-4 mb-3">
          <div class="card bg-transparent">
            <img class="img-fluid" alt="${mediaTitle}" src="https://image.tmdb.org/t/p/w500${poster_path}">
            <div class="card-body ">
              <h5 class="card-title">${mediaTitle}</h5>
              <small class="card-text">Note : ${vote_average}</small>
            </div>
          </div>
        </div>
      `;
    }

    function createCarouselItem(innerHtml, isActive) {
        return `
        <div class="carousel-item ${isActive ? "active" : ""}">
          <div class="row">${innerHtml}</div>
        </div>
      `;
    }

    filmAffiche();
    seriesAffiche();
}
if (url.pathname.includes("favoris.html")) {
    async function favorisFilm() {
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: "Bearer " + token,
            },
        };

        try {
            const response = await fetch(
                "https://api.themoviedb.org/3/account/21227585/favorite/movies?language=fr-FR&page=1&sort_by=created_at.asc",
                options
            );
            const data = await response.json();
            return data.results;
        } catch (error) {
            console.error("Erreur lors du chargement du JSON", error);
            return [];
        }
    }

    async function afficheFilmFav() {
        const film = await favorisFilm();
        filmContainer.innerHTML = "";

        film.forEach(film => {
            const card = creaCard(film);
            filmContainer.innerHTML += card;
        });
    }

    async function favorisSerie() {
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: "Bearer " + apiKey,
            },
        };

        try {
            const response = await fetch(
                "https://api.themoviedb.org/3/account/21227585/favorite/tv?language=fr-FR&page=1&sort_by=created_at.asc",
                options
            );
            const data = await response.json();

            return data.results;
        } catch (error) {
            console.error("Erreur lors du chargement du JSON", error);
            return [];
        }
    }
    async function afficheSerieFav() {
        const serie = await favorisSerie();
        serieContainer.innerHTML = "";

        serie.forEach(serie => {
            const card = creaCard(serie);
            serieContainer.innerHTML += card;
        });
    }

    function creaCard(data) {
        const { title, name, poster_path, overview } = data;
        const mediaTitle = title || name;
        const overviewPreview = overview ? overview.slice(0, 40) + "..." : "";
        return `
    <div class="card bg-transparent" >
    <img class="img-fluid w-20" alt="${mediaTitle}" src="https://image.tmdb.org/t/p/w500${poster_path}">
    <div class="card-text">${overviewPreview}
    </div>
    </div>
      `;
    }

    btnFilm.addEventListener("click", function () {
        afficheFilmFav();
        serieContainer.innerHTML = "";
    });

    btnSerie.addEventListener("click", function () {
        afficheSerieFav();
        filmContainer.innerHTML = "";
    });
}
