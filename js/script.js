import { fetchRecommended } from "./api.js";
import oData from "./oData.js";

const bodyRef = document.body

bodyRef.addEventListener('DOMContentLoaded', async () => {
    if(window.location.pathname === '/' || window.location.pathname === 'src/index.html') {
        fetchRecommended()
        const movies = await fetchRecommended()
        console.log(`loaded movies ${movies}`)
    }
} )





function logoData(){
    console.log(oData.recommendedMovies)
}


