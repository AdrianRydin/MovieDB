
export function getFavorites() {
    return JSON.parse(localStorage.getItem('favorites')) || [];
}


export function toggleFavorite(movieId, starElement) {
    // Always normalize the movieId to avoid subtle mismatches.
    const normalizedId = movieId.toString().trim();
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    
    // Log the current state for debugging
    console.log("Before toggle, favorites:", favorites);
    
    // Check if the normalized movieId is present (using normalization for each element)
    const isFavorite = favorites.some(id => id.toString().trim() === normalizedId);
    
    let updatedFavorites;
    if (isFavorite) {
      // Remove all occurrences of the normalizedId
      updatedFavorites = favorites.filter(id => id.toString().trim() !== normalizedId);
      starElement.classList.remove("filled");
      console.log(`Removed ${normalizedId} from favorites.`);
    } else {
      // Add the normalizedId if it's not present
      updatedFavorites = [...favorites, normalizedId];
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