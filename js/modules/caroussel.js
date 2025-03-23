import oData from "../oData.js";

function getRandomTrailers(moviesArray, count = 5){
    if(!Array.isArray(moviesArray) || moviesArray.length === 0) {
        console.error("Invalid movie list");
        return [];
    }



    for(let i = moviesArray.length - 1; i > 0; i--){ // Fisher-Yates blandning
        let j = Math.floor(Math.random() * (i + 1));
        [moviesArray[i], moviesArray[j]] = [moviesArray[j], moviesArray[i]];
    }
    return moviesArray.splice(0, Math.min(count, moviesArray.length))

}
 



export function displayTrailers() {
    console.log(oData.recommendedMovies)
    oData.randomMovies = getRandomTrailers(oData.recommendedMovies) // Sparar recommended movies till en ny global variabel
    console.log(oData.randomMovies)
    oData.randomMovies.forEach((movie, index) =>{
        let classIndex = index + 1;
        let iFrameRef = document.createElement(`iframe`);

        iFrameRef.src = movie.Trailer_link;
        iFrameRef.classList.add("trailers__video", `trailers__video-${classIndex}`)
        document.querySelector(`.trailers__container`).appendChild(iFrameRef);
    })
    const trailerList = document.querySelectorAll(`.trailers__video`);
    const trailerArray = Array.from(trailerList);
  
    
    document.querySelectorAll(`.trailers__arrow`).forEach(arrow => {
        arrow.addEventListener(`click`, (event) => {
            changeTrailer(event, trailerList, trailerArray);
        });
    })
}

function changeTrailer(event, trailerList, trailerArray) {
    if (event.target.dataset.direction === `right`) {
        trailerArray.push(trailerArray.shift());
    } else if (event.target.dataset.direction === `left`) {
        trailerArray.unshift(trailerArray.pop());
    }

    trailerList.forEach(item => {
        item.classList.remove(
            `trailers__video-1`,
            `trailers__video-2`,
            `trailers__video-3`,
            `trailers__video-4`,
            `trailers__video-5`
        );
    });

    trailerArray.slice(0, 5).forEach((item, i) => {
        item.classList.add(`trailers__video-${i + 1}`)
    });
}


export default displayTrailers