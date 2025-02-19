import { fetchRecommended } from "./api.js";
import displayTrailers from "./modules/caroussel.js"
import oData from "./oData.js";

const bodyRef = document.body
localStorage.clear()
bodyRef.addEventListener('DOMContentLoaded', async () => {
    if(window.location.pathname === '/' || window.location.pathname === '/src/index.html') {
        fetchRecommended()
        const movies = await fetchRecommended()
        console.log(`loaded movies ${movies}`)
    }
} )

fetchRecommended().then((displayTrailers()))



function logoData(){
    console.log(oData.recommendedMovies)
}


