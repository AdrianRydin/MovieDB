import { fetchIndividualMovie, fetchRecommended, searchMovies } from "./api.js";
import { generateCards } from "./modules/cards.js";
import { displayTrailers } from "./modules/caroussel.js"
import { appendContainer, clearContainer } from "./utils/domUtils.js";
import { createFavoriteStar, getFavorites, toggleFavorite } from "./utils/favorites.js";




window.onload = function () {
    const menu_btn = document.querySelector('.header__hamburger-container');
    const mobile_menu = document.querySelector('.headernav__headernav-mobile');
    menu_btn.addEventListener('click', function(){
        menu_btn.classList.toggle('is-active');
        mobile_menu.classList.toggle('is-active');
    })
};

document.addEventListener('DOMContentLoaded', async () => {
    if(window.location.pathname.includes('index.html')) {
        fetchRecommended().then(async () =>{
            displayTrailers()
            const movie = await fetchRecommended()

            const movieCards = movie.map(generateCards);
            console.log(movieCards)
            let container = document.querySelector(".movies")
            clearContainer(container)
            appendContainer(container, movieCards)

            document.querySelectorAll('.favorite-star').forEach(button =>{
                button.addEventListener('click', (event) => {
                    toggleFavorite(event.target.dataset.id)
                    console.log(localStorage.getItem('favorites'))
                    
                })
            })

            const searchForm = document.getElementById('searchForm');
            if(searchForm) {
                searchForm.addEventListener('submit', (event) => {
                    event.preventDefault();
                    console.log("searched")
                    const query = document.getElementById('searchBar').value.trim();
                    
                    if(query) {
                        window.location.href = `search.html?q=${encodeURIComponent(query)}`;
                    }
                })
            }
        });
    }
    if(window.location.pathname.includes('search.html')) {
        const searchParameters = new URLSearchParams(window.location.search);
        const query = searchParameters.get('q')
        if(query) {
            const results = await searchMovies(query)
            const movieCards = results.map(generateCards);
            const container = document.getElementById('.movies');
        
            clearContainer(container)
            appendContainer(container, movieCards)
        }
    }
    if(window.location.pathname.includes('movie.html')) {
        const searchParameters = new URLSearchParams(window.location.search);
        const movieId = searchParameters.get('id')
        console.log("movie Id from url:", movieId)

        if(movieId) {
            const movie = await fetchIndividualMovie(movieId)
            console.log("Fetched movie details:", movie)

            if(movie && movie.Title) {
                console.log(`here's the movie`, movie)
                document.getElementById('movieTitle').textContent = movie.Title || "unknown";
                document.getElementById('moviePoster').src = movie.Poster;
                document.getElementById('moviePoster').alt = `Poster of ${movie.Title}`;
                document.getElementById('movieDirector').textContent = movie.Director || "unknown";
                document.getElementById('movieRunTime').textContent = movie.Runtime;
                document.getElementById('movieRating').textContent = movie.imdbRating;
                document.getElementById('movieCountry').textContent = movie.Country;
                document.getElementById('movieLanguage').textContent = movie.Language

                const favoriteStar = createFavoriteStar(movieId);
                document.querySelector('.movie-details-container').prepend(favoriteStar)
            }
        }
    }
    if(window.location.pathname.includes('favorites.html')) {
        const container = document.getElementById('cardContainer');
        clearContainer(container);

        const favorites = [...new Set(getFavorites())];
        console.log(favorites)
        if(favorites.length === 0) {
            container.innerHTML = "<p>You haven't added any favorite movies yet!</p>";
        } else{
            console.log("hej")

            for(const movieID of favorites) {
                console.log(movieID)
                console.log("hej2")
                const response = await fetch(`https://www.omdbapi.com/?i=${movieID}&apikey=6d4dd304`);
                const movie = await response.json();
                const movieCard = generateCards(movie);
                if(!document.querySelector(`[data-id="${movie.imdbID}"]`)){
                    container.appendChild(movieCard);
                }
            }
            
        }
    }
})

