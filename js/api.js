import oData from "./oData.js"



export async function fetchRecommended(){
    try{
        const response = await fetch("https://santosnr6.github.io/Data/favoritemovies.json");

        if(!response.ok) {
            throw new Error(`Response status:${response.status} `);
        }
        oData.recommendedMovies = await response.json(); // Sparar API resultaten i en global variabel

        
        return oData.recommendedMovies
       
        
    } catch(error){
        console.error(error.message)
        return []
    }
}

export async function fetchImdbMovies(){
    try{
        const response = await fetch('http://www.omdbapi.com/?i=tt3896198&apikey=6d4dd304')

        if(!response.ok) {
            throw new Error(`Response status:${response.status}`);
        }
        oData.imdbMovies = await response.json(); // Sparar API resultaten i en global variabel
        console.log(oData.imdbMovies)

        return oData.imdbMovies
    } catch(error) {
        console.error(error.message)
        return [];
    }
}

export async function searchMovies(query) {
    try{
        const response = await fetch (`http://www.omdbapi.com/?apikey=6d4dd304&s=${query}*`)
        if(!response.ok) throw new Error ('Failed to find movies');
        let search = await response.json();
        return search.Search || [];
    } catch(error) {
        console.error(error)
        return [];
    }
}

export async function fetchIndividualMovie(imdbID) {
    try{
        const response = await fetch (`http://www.omdbapi.com/?apikey=6d4dd304&plot=full&i=${imdbID}`);
        if(!response.ok) throw new Error('Failed to fetch movie');
        return await response.json();
    } catch(error){
        console.error(error);
        return [];
    }
}




// if (localStorage.getItem("movies") === null) {
//     localStorage.setItem("movies", JSON.stringify(movies));
// } else{
//     oData.recommendedMovies = JSON.parse(localStorage.getItem("movies"));
// }
// console.log(oData.recommendedMovies)
