
const apiKey = 'ae8670169658ae97d6990cc8cc40d54a';
const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZTg2NzAxNjk2NThhZTk3ZDY5OTBjYzhjYzQwZDU0YSIsInN1YiI6IjY2MjYxYThhZTg5NGE2MDE3ZDNjMzRjNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bqPMIPnQxZ_TZREm_GNHPOwRkHflMBDpuVFDFTmteUU';
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('movie_id');
const tvId = urlParams.get('tv_id');
// const = url(window.location)
//if (url.pathname.includes(mapage)) apres le code


async function getMovieDetails(movieId) {
  const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=fr`;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Échec de la récupération des détails du film');
    }
    const data = await response.json();
    return data; // Retourne les détails du film
  } catch (error) {
    console.error('Erreur lors de la récupération des détails du film :', error);
    return null; 
  }
}

// AFFICHER DETAILS DU FILMS SUR LA PAGE
async function displayMovieDetails() {  
  if (movieId) {
    // Récupère les détails du film
    const movieDetails = await getMovieDetails(movieId);
    console.log(movieDetails); 

    if (movieDetails) { // recup element + les affiche
      const movieTitleElement = document.getElementById('movieTitle');
      const movieOverviewElement = document.getElementById('movieOverview');
      const movieReleaseDateElement = document.getElementById('movieReleaseDate');
      const movieRuntime = document.getElementById('movieRuntime');
      const moviePosterElement = document.getElementById('moviePoster');
      const movieStatusElement = document.getElementById('movieStatus');
      const movieCountryElement = document.getElementById ('movieCountry');
      const movieVoteAverageElement = document.getElementById ('movieVote');

      movieTitleElement.textContent = movieDetails.title;
      movieOverviewElement.textContent = movieDetails.overview;
      movieReleaseDateElement.textContent = movieDetails.release_date;
      movieRuntime.textContent = movieDetails.runtime;
      moviePosterElement.src = `https://image.tmdb.org/t/p/original${movieDetails.poster_path}`;
      movieStatusElement.textContent = movieDetails.status;
      movieCountryElement.textContent = movieDetails.origin_country;
      movieVoteAverageElement.textContent = movieDetails.vote_average;

    } else {
      console.error('Détails du film non trouvés');
    }
  } else {
    console.error('ID du film non spécifié dans l\'URL');
  }
}

async function getMovieImages(movieId) {
  const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}/images?api_key=${apiKey}`;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Échec de la récupération des images du film');
    }
    const imageData = await response.json();
    console.log('Image data:', imageData); // Log pour vérifier la réponse de l'API
    return imageData.backdrops; // Retourne les données des images du film
  } catch (error) {
    console.error('Erreur lors de la récupération des images du film :', error);
    return null; // En cas d'erreur, retourne null
  }
}

async function displayMovieImages() {
  if (movieId) {
    const movieImages = await getMovieImages(movieId);
    const imagesContainer = document.getElementById('movieImages');
    if (movieImages) {
      movieImages.forEach(backdrop => {
        const imageElement = document.createElement('img');
        imageElement.src = `https://image.tmdb.org/t/p/original${backdrop.file_path}`;
        imageElement.alt = 'Backdrop Image';
        imagesContainer.appendChild(imageElement);
      });
    } else {
      console.error('Images du film non trouvées');
    }
  } else {
    console.error('ID du film non spécifié dans l\'URL');
  }
}

async function getMovieReview(movieId) {
  const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${apiKey}&language=fr`;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch movie reviews');
    }
    const data = await response.json();
    return data.results; // Retourne les critiques du film
  } catch (error) {
    console.error('Error fetching movie reviews:', error);
    return null; 
  }
}

async function displayMovieReview() {
  const movieReviewElement = document.getElementById('movieReview');
  
  if (movieId && movieReviewElement) {
    // Récupère les critiques du film
    const movieReviews = await getMovieReview(movieId);
    
    if (movieReviews && movieReviews.length > 0) {
      // Crée un élément de liste non ordonnée pour afficher les critiques
      const ul = document.createElement('ul');

      // Parcourt chaque critique pour créer un élément de liste pour chaque
      movieReviews.forEach(review => {
        const li = document.createElement('li');
        li.textContent = review.content;
        ul.appendChild(li);
      });

      movieReviewElement.appendChild(ul);
    } else {
      movieReviewElement.textContent = "Aucune critique disponible pour ce film, n'hésitez pas à écrire la première !";
    }
  } else {
    console.error('ID du film non spécifié dans l\'URL ou élément movieReview introuvable');
  }
}

async function addRating(movieId, rating) {
  const options = {method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ value: rating })
  };
  const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}/rating?api_key=${apiKey}`;
  try {
    const response = await fetch(apiUrl, options); 
    if (!response.ok) {
      throw new Error('Failed to add rating to the movie');
    }
    const data = await response.json();
    return data; 
  } catch (error) {
    console.error('Error adding rating to the movie:', error);
    return null; 
  }
}


document.getElementById('ratingForm').addEventListener('submit', async function(event) {
  event.preventDefault(); 
  // Récup la note saisie par l'utilisateur
  const ratingInput = document.getElementById('ratingInput').value;

  try {
    const response = await addRating(movieId, ratingInput);
    console.log('Rating added successfully:', response);
  } catch (error) {
    console.error('Error adding rating to the movie:', error);
  }
});

async function getTvDetails (tvId) {
const apiUrl = `https://api.themoviedb.org/3/tv/${tvId}?language=fr&api_key=${apiKey}`;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Échec de la récupération des détails de la série TV');
    }
    const data = await response.json();
    return data; // Retourne les détails de la série TV
  } catch (error) {
    console.error('Erreur lors de la récupération des détails de la série TV :', error);
    return null; // En cas d'erreur, retourne null
  }
};

async function displayTvDetails() {
  if (tvId) {
    // Récupère les détails de la série TV
    const tvDetails = await getTvDetails(tvId);
    const seasons = await getTvSeasons(tvId);

    if (tvDetails) {
      // Récupère les éléments HTML où afficher les détails de la série TV
      const tvTitleElement = document.getElementById('tvTitle'); 
      const tvOverviewElement = document.getElementById('tvOverview')
      const tvReleaseDateElement = document.getElementById('tvReleaseDate')
      const tvStatusElement = document.getElementById('tvStatus')
      const tvCountryElement = document.getElementById('tvCountry')
      // const tvRuntimeElement = document.getElementById('tvRuntime')
      const tvPoster = document.getElementById('tvPoster')
      
      // Affiche les détails de la série TV sur la page
      tvTitleElement.textContent = tvDetails.name;
      tvOverviewElement.textContent = tvDetails.overview
      tvReleaseDateElement.textContent = tvDetails.first_air_date
      tvStatusElement.textContent = tvDetails.status
      tvCountryElement.textContent = tvDetails.origin_country
      // tvRuntimeElement.textContent = tvDetails.episode_run_time
      tvPoster.src = `https://image.tmdb.org/t/p/original${tvDetails.poster_path}`;

      console.log(tvDetails);
    } else {
      console.error('Détails de la série TV non trouvés');
    }
  } else {
    console.error('ID de la série TV non spécifié dans l\'URL');
  }
}
  
async function getTvReviews(tvId) {
  const apiUrl = `https://api.themoviedb.org/3/tv/${tvId}/reviews?api_key=${apiKey}&language=fr&page=1` ;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch tv show reviews');
    }
    const data = await response.json();
    return data.results; //
  } catch (error) {
    console.error('Error fetching tv show reviews:', error);
    return null;
  }
}

async function displayTvReviews(tvId) {
  const reviewsContainer = document.getElementById('tvReviews'); // Obtient l'élément où afficher les critiques
  reviewsContainer.innerHTML = ''; // Vide le conteneur des critiques précédentes

  // Appelle la fonction pour récupérer les critiques de la série TV
  const reviews = await getTvReviews(tvId);

  if (reviews && reviews.length > 0) {
    // Crée un élément de liste non ordonnée pour afficher les critiques
    const ul = document.createElement('ul');

    // Parcourt chaque critique pour créer un élément de liste pour chaque
    reviews.forEach(review => {
      const li = document.createElement('li');
      li.textContent = review.content;
      ul.appendChild(li);
    });

    // Ajoute la liste des critiques à l'élément conteneur
    reviewsContainer.appendChild(ul);
  } else {
    // Affiche un message si aucune critique n'a été trouvée
    reviewsContainer.textContent = "Aucune critique disponible pour cette série TV.";
  }
}

async function getTvSeason(tvId, seasonNumber) {
  const apiUrl = `https://api.themoviedb.org/3/tv/${tvId}/season/${seasonNumber}?api_key=${apiKey}&language=fr`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Échec de la récupération des détails de la saison de la série TV');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erreur lors de la récupération des détails de la saison de la série TV :', error);
    return null;
  }
}

async function getTvSeasons(tvId) {
  const apiUrl = `https://api.themoviedb.org/3/tv/${tvId}/season/1?api_key=${apiKey}&language=fr`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Échec de la récupération des saisons de la série TV');
    }
    const data = await response.json();
    const totalSeasons = data.number_of_seasons;
    const seasons = [];

    for (let i = 1; i <= totalSeasons; i++) {
      const seasonUrl = `https://api.themoviedb.org/3/tv/${tvId}/season/${i}?api_key=${apiKey}&language=fr`;
      const seasonResponse = await fetch(seasonUrl);
      if (!seasonResponse.ok) {
        throw new Error(`Échec de la récupération de la saison ${i} de la série TV`);
      }
      const seasonData = await seasonResponse.json();
      seasons.push(seasonData);
    }

    return seasons;
  } catch (error) {
    console.error('Erreur lors de la récupération des saisons de la série TV :', error);
    return null;
  }
}

async function displayTvSeasons(tvId,seasonsNumber) {
  const seasonsContainer = document.getElementById('tvSeasons');

  if (seasons && seasons.length > 0) {
    seasons.forEach(season => {
      const seasonElement = document.createElement('div');
      seasonElement.classList.add('season');
      seasonElement.innerHTML = `
        <h3>Saison ${season.season_number}</h3>
        <p>Date de diffusion : ${season.air_date}</p>
        <p>Nombre d'épisodes : ${season.episode_count}</p>
        <p>Résumé : ${season.overview}</p>
      `;
      seasonsContainer.appendChild(seasonElement);
    });
  } else {
    seasonsContainer.innerHTML = '<p>Aucune saison trouvée.</p>';
  }
}
async function getTvSeasonDetails(tvId, seasonNumber) {
  const apiUrl = `https://api.themoviedb.org/3/tv/${tvId}/season/${seasonNumber}?api_key=${apiKey}&language=fr`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Échec de la récupération des détails de la saison de la série TV');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erreur lors de la récupération des détails de la saison de la série TV :', error);
    return null;
  }
}
async function displayTvSeasonDetails(tvId,seasonNumber) {
  // Récupère les détails de la série TV pour obtenir le nombre de saisons
  const tvDetails = await getTvDetails(tvId);

  if (tvDetails && tvDetails.number_of_seasons) {
    // Obtient le nombre total de saisons de la série TV
    const numberOfSeasons = tvDetails.number_of_seasons;

    const seasonsContainer = document.getElementById('tvSeasons'); // Obtient l'élément où afficher les détails des saisons
    seasonsContainer.innerHTML = ''; // Vide le conteneur des détails des saisons précédentes

    // Appelle la fonction pour récupérer les détails de chaque saison de la série TV
    for (let i = 1; i <= numberOfSeasons; i++) {
      try {
        const seasonDetails = await getTvSeasonDetails(tvId, i); // Récupère les détails de la saison actuelle
        if (seasonDetails) {
          const seasonElement = document.createElement('div');
          seasonElement.innerHTML = `<p><strong>Saison ${i}</strong></p><p>${seasonDetails.overview}</p>`;
          seasonsContainer.appendChild(seasonElement);
        } else {
          console.error(`Détails de la saison ${i} non trouvés`);
        }
      } catch (error) {
        console.error(`Erreur lors de la récupération des détails de la saison ${i} :`, error);
      }
    }
  } else {
    console.error('Impossible de récupérer le nombre de saisons pour la série TV');
  }
}


// Appeller fonctions
document.addEventListener('DOMContentLoaded', async function() {
  await displayMovieDetails();
  await displayTvDetails();
  await displayMovieReview(); 
  await displayTvReviews(tvId);
  await displayTvSeason();
  await displayTvSeasonDetails(tvId, seasonNumber);

});
document.addEventListener('DOMContentLoaded', function() {
  // Fonction pour obtenir les paramètres d'URL
  function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  };

  // Récupérer le type de contenu à partir des paramètres d'URL
  var contentType = getUrlParameter('type');

  // Afficher la section appropriée en fonction du type de contenu
  if (contentType === 'movie') {
    document.getElementById('movieSection').style.display = 'block';
    document.getElementById('tvSection').style.display = 'none';
  } else if (contentType === 'tv') {
    document.getElementById('movieSection').style.display = 'none';
    document.getElementById('tvSection').style.display = 'block';
  }
});
