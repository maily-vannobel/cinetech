const apiKey = '985af490e03aec88602ac850abcda411';
// Fonction pour récupérer les détails d'un film par son ID
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

// Fonction pour afficher les détails d'un film sur la page de détail
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
      
      // Affiche les détails du film sur la page
      movieTitleElement.textContent = movieDetails.title;
      movieOverviewElement.textContent = movieDetails.overview;
      movieReleaseDateElement.textContent = movieDetails.release_date;
      movieRuntime.textContent = movieDetails.runtime;

    } else {
      console.error('Détails du film non trouvés');
    }
  } else {
    console.error('ID du film non spécifié dans l\'URL');
  }
}
