// DEBUT ALONZO !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// Variables    !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const url = window.location;
const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ODVhZjQ5MGUwM2FlYzg4NjAyYWM4NTBhYmNkYTQxMSIsInN1YiI6IjY2MjYxYThhZTg5NGE2MDE3ZDNjMzRjNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.82jT1cnded8rY4MYIJzmt5ie-PBT7Z7l_OhBn_3Ee8I";
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
// FIN ALONZO   !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
