document.addEventListener("DOMContentLoaded", () => {

    let wrapperELm = document.querySelector(".wrapper")

    let headerElm = document.createElement("header")
    headerElm.classList.add("header", "detail-header")
    wrapperELm.append(headerElm)

    let headerNav = document.createElement("div")
    headerNav.classList.add("nav")

    headerNav.innerHTML = `

        <a href="index.html" class="back" ><i class="fa-solid fa-arrow-left"></i></a>
        <button class="toggle" onclick="darkmodeToggle()"><i id="toggleIcon" class="fa-solid fa-toggle-off"></i></button>
    
        `
    headerElm.append(headerNav)


    let mainElm = document.createElement("main")
    mainElm.classList.add("content", "detail-content")
    wrapperELm.append(mainElm)

    let footerElm = document.createElement("footer")
    footerElm.classList.add("footer", "detail-footer")
    wrapperELm.append(footerElm)

   


    let params = new URLSearchParams(window.location.search) 
    let id = params.get("id")
    
    fetch(`${baseURL}/movie/${id}?api_key=${apikey}&append_to_response=videos`)
        .then(response => response.json())
        .then(movie => {

            
        let movieRating = movie.vote_average.toFixed(1)
        let releaseDate = movie.release_date
        
        let [year, month, day] = releaseDate.split('-')
        
        let movieYear = [year][0]

        let movieLanguage = languages.find(language => language.code == movie.original_language)        

        let officialTrailer = movie.videos.results.find(video => video.type == "Trailer" )


        
        let movieCover = document.createElement("div")
        movieCover.classList.add("cover")

        if ( officialTrailer !== undefined ) {
            movieCover.innerHTML = `
                <button id="playBtn"><i class="fa-solid fa-circle-play"></i><br>Play Trailer</button>
                <img src="${imgURL}${movie.backdrop_path}" alt="${movie.title}">
            `
        } else {
            movieCover.innerHTML = `<img src="${imgURL}${movie.backdrop_path}" alt="${movie.title}">`
        }
        
        headerElm.append(movieCover)

        mainElm.innerHTML = `
                <section class="movie-details">
                    <header class="movie-details__header">
                        <h1 class="movie-title">${movie.title}</h1>
                        <button id="bmBtn" class="bookmark" onclick="darkmodeToggle()"><i id="bmIcon" class="fa-regular fa-bookmark"></i></button>
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
                <section class="movie-cast">
                    <header class="section-header">
                        <h2 class="block-title">Cast</h2>
                        <a href="#" class="btn">See more</a>
                    </header>
                    <ul class="movie-cast__list"></ul>
                </section>
            `

            movie.genres.forEach(genre => {
                let genreList = document.querySelector(".movie-genres")
                let genreItem = document.createElement("li")
				genreItem.innerText = genre.name
                genreList.append(genreItem)
            })



        fetch(`${baseURL}/movie/${movie.id}/credits?api_key=${apikey}`)
            .then(response => response.json())
            .then(credits => {

                let casts = credits.cast
                let castList = document.querySelector(".movie-cast__list")
                
                casts.forEach(cast => {
            
                    let listItem = document.createElement("li")
                    listItem.classList.add("listItem")
                    
                    if (cast.profile_path) {
                        listItem.innerHTML = `
                        <img src="${imgURL}${cast.profile_path}" alt="${cast.name}">
                        <h1>${cast.name}</h1>
                        `
                    } else {
                        listItem.innerHTML = `
                        <img src="https://placehold.jp/10/fff/ddd/72x72.png?text=No+Foto" alt="${cast.name}">
                        <h1>${cast.name}</h1>
                        `
                    }

                    castList.append(listItem)

                })
            
        })


        
            let videoModal = document.getElementById("videoModal")
            let modalInner = document.createElement("div")
            modalInner.classList.add("modal-inner")

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
                    } else {
                        return
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

                let bmIcon = document.getElementById("bmIcon")

                if ( bmIcon.classList.contains("fa-regular") ) {
                    bmIcon.classList.remove("fa-regular")
                    bmIcon.classList.add("fa-solid")

                    localStorage.setItem("bm-" + movie.id, "true")

                } else {
                    bmIcon.classList.add("fa-regular")
                    bmIcon.classList.remove("fa-solid")

                    localStorage.setItem("bm-" + movie.id, "false")
                }
                
            }


            window.onload = function () {

                let bmKey = "bm-" + movie.id
                let bmIcon = document.getElementById("bmIcon")

                if ( localStorage.getItem(bmKey) !== null ) {
                    if ( localStorage.getItem(bmKey) == "true" ) {
                        bmIcon.classList.remove("fa-regular")
                        bmIcon.classList.add("fa-solid")
                    } else {
                        bmIcon.classList.add("fa-regular")
                        bmIcon.classList.remove("fa-solid")
                    }
                }
            }
        
    })

    window.onload = setDarkmode()

})

