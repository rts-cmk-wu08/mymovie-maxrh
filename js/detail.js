import { languages } from "../data/languages.js"
import makeElement from "../modules/makeElement.js"
import genreSpan from "../modules/genreSpan.js"
import sectionHeader from "../modules/sectionHeader.js"
import timeConvert from "../modules/timeConvert.js"

let params = new URLSearchParams(window.location.search) 
let id = params.get("id")

pageTitle.classList.add("hidden")

    fetch(`${baseURL}/movie/${id}?api_key=${apikey}&append_to_response=videos`)
        .then(response => response.json())
        .then(movie => {
            
        let movieRating = movie.vote_average.toFixed(1)
        let releaseDate = movie.release_date
        let [year, month, day] = releaseDate.split('-')
        let movieYear = [year][0]
        let movieLanguage = languages.find(language => language.code == movie.original_language)        
        let officialTrailer = movie.videos.results.find(video => video.type == "Trailer" )
        
        let bmKey = "bm-" + movie.id
        let isBookmarked = localStorage.getItem(bmKey)

        let movieCover = makeElement("div", "cover")

        if ( officialTrailer !== undefined ) {
            movieCover.innerHTML = `
                <button id="playBtn"><i class="fa-solid fa-circle-play"></i><br>Play Trailer</button>
                <img src="${imgURL}${movie.backdrop_path}" alt="${movie.title}">
            `
        } else {
            movieCover.innerHTML = `<img src="${imgURL}${movie.backdrop_path}" alt="${movie.title}">`
        }
        
        headerElm.append(movieCover)

        console.log(isBookmarked)

        mainElm.innerHTML = `
                <section class="movie-details">
                    <header class="movie-details__header">
                        <h1 class="movie-title">${movie.title}</h1>
                        <button id="bmBtn" class="bookmark"><i id="bmIcon" class="${isBookmarked === "true" ? "fa-solid" : "fa-regular"} fa-bookmark"></i></button>
                    </header>
                    
                    <span class="movie-rating"><i class="fa-solid fa-star"></i> ${movieRating}/10 IMDb</span>
                    <ul class="movie-genres"></ul>
                    <ul class="movie-info">
                        <li class="movie-info__length">Length<br> <strong>${timeConvert(movie.runtime)}</strong></li>
                        <li class="movie-info__language">Language<br> <strong>${movieLanguage.name}</strong></li>
                        <li class="movie-info__cert">Release<br> <strong>${movieYear}</strong></li>
                    </ul>
                </section>
                <section class="movie-description">
                    <h2 class="block-title">Description</h2>
                    <p>${movie.overview}</p>
                </section>
                <section class="movie-cast"></section>
            `

            let castElm = document.querySelector(".movie-cast")
            castElm.append(sectionHeader("Cast", "See more", "#"))
            castElm.append(makeElement("div", "ml", "ml-horizontal", "moviecast-list"))

            let genreList = document.querySelector(".movie-genres")

            movie.genres.forEach(genre => {
                genreList.append(genreSpan(genre))
            })

        fetch(`${baseURL}/movie/${movie.id}/credits?api_key=${apikey}`)
            .then(response => response.json())
            .then(credits => {

                let casts = credits.cast
                let castList = document.querySelector(".moviecast-list")
                
                casts.forEach(cast => {
                    
                    let listItem = makeElement("li", "ml-item")

                    if (cast.profile_path) {
                        listItem.innerHTML = `
                        <img src="https://placehold.jp/10/fff/aaa/72x72.png?text=Loading" alt="${cast.name}">
                        <h1 class="ml-title">${cast.name}</h1>
                        `
                    } else {
                        listItem.innerHTML = `
                        <img src="https://placehold.jp/10/fff/aaa/72x72.png?text=No+Foto" alt="${cast.name}">
                        <h1 class="ml-title">${cast.name}</h1>
                        `
                    }

                    castList.append(listItem)

                    let imgElm = listItem.querySelector("img")
                    let castImg = new Image()

                    castImg.src = `${imgURL}${cast.profile_path}`

                    castImg.onload = () => {
                        imgElm.src = castImg.src
                    }

                })

            })

            let videoModal = document.getElementById("videoModal")
            let modalInner = makeElement("div", "modal-inner")
            let playBtn = document.getElementById("playBtn")

            if (playBtn) {

                playBtn.onclick = function() {
                    videoModal.style.display = "block"
                    if ( officialTrailer !== undefined ) {
                        modalInner.innerHTML = `
                            <span class="close">Click anywhere outside video to close</span>
                            <div class="video_wrapper">
                                <iframe id="ytplayer" type="text/html" frameborder="0" width="100%" height="100%" 
                                src="https://www.youtube.com/embed/${officialTrailer.key}" allowfullscreen>
                            </div>
                        `
                    } 

                    videoModal.append(modalInner)
                }

            } 

            window.onclick = function(event) {
                if (event.target == videoModal) {
                    videoModal.style.display = "none"
                    modalInner.innerHTML = ``
                }
            }

            let bmBtn = document.getElementById("bmBtn")

            bmBtn.onclick = function() {
                if ( localStorage.getItem(bmKey) !== "true" ) {
                    localStorage.setItem("bm-" + movie.id, "true")
                    bmIcon.classList.remove("fa-regular")
                    bmIcon.classList.add("fa-solid")
                } else  {
                    localStorage.setItem("bm-" + movie.id, "false")
                    bmIcon.classList.add("fa-regular")
                    bmIcon.classList.remove("fa-solid")
                }
            }

   
        setDarkmode() 
    })