import oData from "../oData.js";


displayTrailers()

function displayTrailers() {

    const iFrameRef = document.createElement("iframe");
    const trailerRef = document.querySelector(".trailers__container")
    iFrameRef.classList.add(`trailers__video`)
    

    const trailerList = document.querySelectorAll(`.trailers__video`);
    const trailerArray = Array.from(trailerList);
    console.log(oData.recommendedMovies)
    trailerRef.appendChild(iFrameRef)
    for(let i = 0; i < 4; i++){
        iFrameRef.src = oData.recommendedMovies[i].Trailer_link;
        trailerRef.appendChild(iFrameRef)
    }
    document.querySelectorAll(`.trailers__arrow`).forEach(arrow => {
        arrow.addEventListener(`click`, (event) => {
            changeTrailer(event, trailerList, trailerArray)
        })
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
