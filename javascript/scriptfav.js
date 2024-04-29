const apiKey =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMzAzNjg0OGQ1YWQ3YWIwZTZhYjcyNzA1MjFlOWM2NSIsInN1YiI6IjY2Mjc0OTJhMDdmYWEyMDE0OTk4YmY3OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Reavry7pTo66xr_7SiYMxtIkyoS8RXEikzP2MErg7hY";
const filmContainer = document.querySelector(".filmContainer");
const serieContainer = document.querySelector(".serieContainer");
const btnFilm = document.querySelector(".btnFilm");
const btnSerie = document.querySelector(".btnSerie");

async function favorisFilm() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + apiKey,
    },
  };

  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/account/21229436/favorite/movies?language=fr-FR&page=1&sort_by=created_at.asc",
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

  film.forEach((film) => {
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
      "https://api.themoviedb.org/3/account/21229436/favorite/tv?language=fr-FR&page=1&sort_by=created_at.asc",
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

  serie.forEach((serie) => {
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
