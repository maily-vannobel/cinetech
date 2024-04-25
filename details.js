
const apiKey = '985af490e03aec88602ac850abcda411';

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
    return null; // En cas d'erreur, retourne null
  }
}

// AFFICHER DETAILS DU FILMS SUR LA PAGE
async function displayMovieDetails() {
  // Récupère l'ID du film depuis l'URL de la page de détail
  const urlParams = new URLSearchParams(window.location.search);
  const movieId = urlParams.get('id');
  
  if (movieId) {
    // Récupère les détails du film
    const movieDetails = await getMovieDetails(movieId);
    console.log(movieDetails); 

    if (movieDetails) {
      // Récupère les éléments HTML où afficher les détails du film
      const movieTitleElement = document.getElementById('movieTitle');
      const movieOverviewElement = document.getElementById('movieOverview');
      const movieReleaseDateElement = document.getElementById('movieReleaseDate');
      const movieRuntime = document.getElementById('movieRuntime');
      const moviePosterElement = document.getElementById('moviePoster');
      const movieStatusElement = document.getElementById('movieStatus');
      const movieCountryElement = document.getElementById ('movieCountry');
      // Affiche les détails du film sur la page
      movieTitleElement.textContent = movieDetails.title;
      movieOverviewElement.textContent = movieDetails.overview;
      movieReleaseDateElement.textContent = movieDetails.release_date;
      movieRuntime.textContent = movieDetails.runtime;
      moviePosterElement.src = `https://image.tmdb.org/t/p/original${movieDetails.poster_path}`;
      movieStatusElement.textContent = movieDetails.status;
      movieCountryElement.textContent = movieDetails.origin_country;

    } else {
      console.error('Détails du film non trouvés');
    }
  } else {
    console.error('ID du film non spécifié dans l\'URL');
  }
}

// AFFICHER LES IMAGES DU FILMS SUR LA PAGE

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

const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');


async function displayMovieImages() {
  const urlParams = new URLSearchParams(window.location.search);
  const movieId = urlParams.get('id');

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
};

async function displayMovieReview() {
  // Récupère l'ID du film depuis l'URL de la page de détail
  const urlParams = new URLSearchParams(window.location.search);
  const movieId = urlParams.get('id');
  
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

      // Ajoute la liste des critiques à la div avec l'ID "movieReview"
      movieReviewElement.appendChild(ul);
    } else {
      movieReviewElement.textContent = "Aucune critique disponible pour ce film, n'hésitez pas à écrire la première !";
    }
  } else {
    console.error('ID du film non spécifié dans l\'URL ou élément movieReview introuvable');
  }
}


// Appelle la fonction pour afficher pages
document.addEventListener('DOMContentLoaded', async function() {
  await displayMovieDetails();
});

document.addEventListener('DOMContentLoaded', async function() {
  await displayMovieReview();
});
