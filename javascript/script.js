// DEBUT ALONZO !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// Page films   !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
document.addEventListener("DOMContentLoaded", function () {
    boutonsDesCategories.forEach(function (bouton) {
        bouton.addEventListener("click", () => {
            const categorie = bouton.getAttribute("data-tv");
            films.innerHTML = "";
            listeDesFilms(categorie);
        });
    });
    listeDesFilms("popular");
    console.log("Le DOM est entièrement chargé !");
});
// Page series  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// FIN ALONZO   !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
