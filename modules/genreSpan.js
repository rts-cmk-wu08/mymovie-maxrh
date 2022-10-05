import { genres } from "../data/genres.js"

let genreSpan = function(id) {

    let currentGenre = genres.find(genre => genre.id == id)

    let element = document.createElement("li")

    genreItem.innerText = currentGenre.name


    return element


}