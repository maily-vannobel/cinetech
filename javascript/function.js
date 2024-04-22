// DEBUT ALONZO !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const options = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ODVhZjQ5MGUwM2FlYzg4NjAyYWM4NTBhYmNkYTQxMSIsInN1YiI6IjY2MjYxYThhZTg5NGE2MDE3ZDNjMzRjNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.82jT1cnded8rY4MYIJzmt5ie-PBT7Z7l_OhBn_3Ee8I",
    },
};
// Page films   !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const boutonsDesCategories = document.querySelectorAll(".btn-categorie");
const films = document.querySelector(".films");

function listeDesFilms(categorie) {
    fetch(
        `https://api.themoviedb.org/3/movie/${categorie}?language=fr-FR&page=1`,
        options
    )
        .then(response => response.json())
        .then(data => {
            for (i = 0; i < data.results.length; i++) {
                let film = `<div class="card" style="max-width: 18em" data-tv-id="${data.results[i].id}">
                <img
                    src="https://image.tmdb.org/t/p/w500/${data.results[i].poster_path}"
                    class="card-img-top"
                    alt="image promotionnelle"
                />
                <div class="card-body">
                    <h5 class="card-title">${data.results[i].title}</h5>

                    <small class="card">Notes : ${data.results[i].vote_average}</small>

                    <p class="card-text">Description : ${data.results[i].overview}</p>
                </div>
            </div> `;
                films.innerHTML = film;
            }
        })
        .catch(err => console.error(err));
}

// Page series  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// FIN ALONZO   !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
