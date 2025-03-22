import { getFavorites, toggleFavorite } from "../utils/favorites.js";

export function generateCards(movie){
    const favorites = getFavorites(); // Se till att det är en array
    const isFavorite = favorites.includes(movie.imdbID);

    let movieContainerRef = document.querySelector(".movies")
    let sectionRef = document.createElement("div");
    let titleRef = document.createElement("h1");
    let imageRef = document.createElement("img");
    let starRef = document.createElement('span')

    sectionRef.classList.add('movie-container')

    titleRef.textContent = movie.Title;
    titleRef.classList.add("jost-medium")
    imageRef.src = movie.Poster;

    starRef.classList.add('favorite-star');
    if(isFavorite) starRef.classList.add('filled');
    starRef.dataset.id = movie.imdbID;
    starRef.textContent = '★'
    

    sectionRef.appendChild(titleRef);
    sectionRef.appendChild(imageRef);
    sectionRef.appendChild(starRef)
    sectionRef.classList.add("movie");
    sectionRef.dataset.imdbID = movie.imdbID;
    movieContainerRef.appendChild(sectionRef)

    movieContainerRef.addEventListener('click', (ev) =>{
        const card = ev.target.closest('.movie');
        if (!card) return;
        const imdbID = card.dataset.imdbID
        window.location.href = `movie.html?id=${imdbID}`
    })

    starRef.addEventListener('click', (event) => {
        event.stopPropagation();
        toggleFavorite(movie.imdbID, starRef)
    })

    return sectionRef
}