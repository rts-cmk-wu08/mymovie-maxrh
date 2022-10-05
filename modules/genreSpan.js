import { genres } from "../data/genres.js"

let genreSpan = function(id) {

    let element = document.createElement("li")

    if(isNaN(id)){
        element.innerText = id.name
    } else {
        let currentGenre = genres.find(genre => genre.id == id)
        element.innerText = currentGenre.name
    }

    return element

}

export default genreSpan