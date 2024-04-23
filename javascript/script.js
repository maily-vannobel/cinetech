const apiKey =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMzAzNjg0OGQ1YWQ3YWIwZTZhYjcyNzA1MjFlOWM2NSIsInN1YiI6IjY2Mjc0OTJhMDdmYWEyMDE0OTk4YmY3OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Reavry7pTo66xr_7SiYMxtIkyoS8RXEikzP2MErg7hY";
const filmsContainer = document.querySelector(
  "#carouselExampleIndicators1 .carousel-inner"
);
const seriesContainer = document.querySelector(
  "#carouselExampleIndicators2 .carousel-inner"
);

async function filmAccueil() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + apiKey,
    },
  };

  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc",
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
      Authorization: "Bearer " + apiKey,
    },
  };

  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/discover/tv?include_null_first_air_dates=false&timezone=America%2FNew_York&with_original_language=en&page=1&sort_by=popularity.desc",
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
  const mediaTitle = title || name; // utilise le titre du film ou de la série en fonction de la propriété existante

  return `
    <div class="col-md-4 mb-3">
      <div class="card">
        <img class="img-fluid" alt="${mediaTitle}" src="https://image.tmdb.org/t/p/w500${poster_path}">
        <div class="card-body">
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
