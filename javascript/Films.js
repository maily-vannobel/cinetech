// DEBUT ALONZO !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// Page films   !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
document.addEventListener("DOMContentLoaded", function () {
    const token =
        "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ODVhZjQ5MGUwM2FlYzg4NjAyYWM4NTBhYmNkYTQxMSIsInN1YiI6IjY2MjYxYThhZTg5NGE2MDE3ZDNjMzRjNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.82jT1cnded8rY4MYIJzmt5ie-PBT7Z7l_OhBn_3Ee8I";
    let filmsPopulaires, filmsMieuxNotes, filmsProchainement, filmsEnCours;

    async function filmsFetchParCategoriesPageUn(categorie) {
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: "Bearer " + token,
            },
        };
        try {
            const reponse = await fetch(
                `https://api.themoviedb.org/3/movie/${categorie}?language=fr-FR&page=1`,
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
    async function filmsFetchParCategoriesPageDeux(categorie) {
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: "Bearer " + token,
            },
        };
        try {
            const reponse = await fetch(
                `https://api.themoviedb.org/3/movie/${categorie}?language=fr-FR&page=2`,
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
    async function filmsFetchParCategoriesPageTrois(categorie) {
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: "Bearer " + token,
            },
        };
        try {
            const reponse = await fetch(
                `https://api.themoviedb.org/3/movie/${categorie}?language=fr-FR&page=3`,
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
    async function filmsFetchParCategoriesPageQuatre(categorie) {
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: "Bearer " + token,
            },
        };
        try {
            const reponse = await fetch(
                `https://api.themoviedb.org/3/movie/${categorie}?language=fr-FR&page=3`,
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

    async function chargerFilms() {
        filmsPopulaires = await filmsFetchParCategoriesPageQuatre("popular");
        filmsMieuxNotes = await filmsFetchParCategoriesPageTrois("top_rated");
        filmsProchainement = await filmsFetchParCategoriesPageDeux("upcoming");
        filmsEnCours = await filmsFetchParCategoriesPageUn("now_playing");
    }

    chargerFilms();

    function afficherFilms(data) {
        const films = document.querySelector(".films-cards");
        let contenuHTML = "";
        for (let i = 0; i < data.length; i++) {
            contenuHTML += `
                <div class="card mb-3" style="max-width: 540px; height:275px;">
                    <div class="row g-0">
                        <div class="col-md-4" data-tv-id="${data[i].id}">
                            <img src="https://image.tmdb.org/t/p/w500/${data[i].poster_path}" class="img-fluid rounded-start" alt="image promotionnelle">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">${data[i].title}</h5>
                                <p class="card-text description">Description : ${data[i].overview}</p>
                                <small class="card-text">Notes : ${data[i].vote_average}</small>
                            </div>
                        </div>
                    </div>
                </div>`;
        }
        films.innerHTML = contenuHTML;
    }

    document
        .querySelector(".populaires-btn")
        .addEventListener("click", () => afficherFilms(filmsPopulaires));
    document
        .querySelector(".mieux-notes-btn")
        .addEventListener("click", () => afficherFilms(filmsMieuxNotes));
    document
        .querySelector(".prochainement-btn")
        .addEventListener("click", () => afficherFilms(filmsProchainement));
    document
        .querySelector(".en-cours-btn")
        .addEventListener("click", () => afficherFilms(filmsEnCours));
    afficherFilms(filmsPopulaires);
});

// Page series  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// FIN ALONZO   !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
