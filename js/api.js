import oData from "./oData.js"



export async function fetchRecommended(){
    try{
        const response = await fetch("https://santosnr6.github.io/Data/favoritemovies.json");

        if(!response.ok) {
            throw new Error(`Response status:${response.status} `);
        }
        let movies = await response.json();

        if (localStorage.getItem("movies") === null) {
            localStorage.setItem("movies", JSON.stringify(movies));
        } else{
            oData.recommendedMovies = JSON.parse(localStorage.getItem("movies"));
        }
        return movies;
       
        
    } catch(error){
        console.error(error.message)
        return []
    }
}
console.log(oData.recommendedMovies)



