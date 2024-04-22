// TMDB créer un compte sur l'api
//access token api contient json avec tte les info
// reussi d'abord requete en GET pour recup, et post on envoie

  const apiKey = '985af490e03aec88602ac850abcda411';

function getMovieDetails(movieId) {
  const url =  `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`;
fetch(url)
.then(response => response.json())
.then(data => {
  console.log(data);
    // Manipulation des données récupérées
    const title = data.title;
    const director = data.director;
    const actors = data.actors;
    const country = data.production_countries[0].name;
    const summary = data.overview;

    // Affichage des données sur la page HTML
    document.getElementById('title').innerText = title;
    document.getElementById('director').innerText = director;
    document.getElementById('actors').innerText = actors;
    document.getElementById('country').innerText = country;
    document.getElementById('summary').innerText = summary;
})
.catch(error => {
    console.error('Erreur lors de la récupération des détails du film :', error);
});
}

// Appel de la fonction pour obtenir les détails d'un film avec un ID spécifique
getMovieDetails(12345);