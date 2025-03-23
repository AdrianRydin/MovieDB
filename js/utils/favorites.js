
export function getFavorites() {
    return JSON.parse(localStorage.getItem('favorites')) || [];
}


export function toggleFavorite(movieId, starElement) {
    const normalizedId = movieId.toString().trim(); // Ser till att ID som hämtas är en sträng och inga extra tecken
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    
    console.log("Before toggle, favorites:", favorites); // Debug
    
    const isFavorite = favorites.some(id => id.toString().trim() === normalizedId); // Kollar om movieID finns i listan
    
    let updatedFavorites;
    if (isFavorite) {
      updatedFavorites = favorites.filter(id => id.toString().trim() !== normalizedId); // Tar bort movieID från favorit listan
      starElement.classList.remove("filled");
      console.log(`Removed ${normalizedId} from favorites.`);
    } else {
      updatedFavorites = [...favorites, normalizedId]; // Lägger till movieID i favorit listan
      starElement.classList.add("filled");
      console.log(`Added ${normalizedId} to favorites.`);
    }
    
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    console.log("After toggle, favorites:", updatedFavorites);
  }

export function createFavoriteStar(movieId) {
    let favorites = getFavorites();

    let starRef = document.createElement('span')
    starRef.classList.add('favorite-star');
    starRef.dataset.id = movieId;
    starRef.textContent = '★';

    if(favorites.includes(movieId)) {
        starRef.classList.add('filled')
    }

    starRef.addEventListener('click', (event) => {
        event.stopPropagation();
        toggleFavorite(movieId, starRef)
    })
    return starRef
}