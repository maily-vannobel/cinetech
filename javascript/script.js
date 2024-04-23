// DEBUT ALONZO !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// Page films   !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const url = window.location;
const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ODVhZjQ5MGUwM2FlYzg4NjAyYWM4NTBhYmNkYTQxMSIsInN1YiI6IjY2MjYxYThhZTg5NGE2MDE3ZDNjMzRjNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.82jT1cnded8rY4MYIJzmt5ie-PBT7Z7l_OhBn_3Ee8I";

if (url.pathname.includes("films.html")) {
    // FETCH de l'API TMDB recuperation des differentes pages et tri des catégories (top rated, popular, upcoming, now playing)
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
    // creation des cartes a l'ouverture de la page films.html
    async function afficherFilms(categorie, page) {
        const filmsResultat = await filmsFetchParCategoriesEtPage(
            categorie,
            page
        );
        const films = document.querySelector(".films-cards");
        let contenuHTML = "";
        for (let i = 0; i < filmsResultat.length; i++) {
            contenuHTML += `
            <div class="card mb-3" style="max-width: 540px; height:275px;">
                <div class="row g-0">
                    <div class="col-md-4" data-tv-id="${filmsResultat[i].id}">
                        <img src="https://image.tmdb.org/t/p/w500/${filmsResultat[i].poster_path}" class="img-fluid rounded-start" alt="image promotionnelle">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${filmsResultat[i].title}</h5>
                            <p class="card-text description">Description : ${filmsResultat[i].overview}</p>
                            <small>Notes : ${filmsResultat[i].vote_average}</small>
                        </div>
                    </div>
                </div>
            </div>`;
        }
        films.innerHTML = contenuHTML;
    }
    // Basuler de categories et supprime les cartes precedents pour afficher les nouvelles
    document
        .querySelector(".populaires-btn")
        .addEventListener("click", () => afficherFilms("popular", 1));
    document
        .querySelector(".mieux-notes-btn")
        .addEventListener("click", () => afficherFilms("top_rated", 2));
    document
        .querySelector(".prochainement-btn")
        .addEventListener("click", () => afficherFilms("upcoming", 3));
    document
        .querySelector(".en-cours-btn")
        .addEventListener("click", () => afficherFilms("now_playing", 4));

    afficherFilms("popular", 2);
}

// Page series  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
if (url.pathname.includes("series.html")) {
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
            <div class="card mb-3" style="max-width: 540px; height:275px;">
                <div class="row g-0">
                    <div class="col-md-4" data-tv-id="${filmsResultat[i].id}">
                        <img src="https://image.tmdb.org/t/p/w500/${filmsResultat[i].poster_path}" class="img-fluid rounded-start" alt="image promotionnelle">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${filmsResultat[i].title}</h5>
                            <p class="card-text description">Description : ${filmsResultat[i].overview}</p>
                            <small>Notes : ${filmsResultat[i].vote_average}</small>
                        </div>
                    </div>
                </div>
            </div>`;
        }
        films.innerHTML = contenuHTML;
    }

    document
        .querySelector(".populaires-btn")
        .addEventListener("click", () => afficherFilms("popular", 1));
    document
        .querySelector(".mieux-notes-btn")
        .addEventListener("click", () => afficherFilms("top_rated", 2));
    document
        .querySelector(".prochainement-btn")
        .addEventListener("click", () => afficherFilms("upcoming", 3));
    document
        .querySelector(".en-cours-btn")
        .addEventListener("click", () => afficherFilms("now_playing", 4));

    afficherFilms("popular", 2);
}
// FIN ALONZO   !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
