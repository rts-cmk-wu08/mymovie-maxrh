document.addEventListener("DOMContentLoaded", () => {

    let wrapperELm = document.querySelector(".wrapper")

    let headerElm = document.createElement("header")
    headerElm.classList.add("header", "detail-header")
    wrapperELm.append(headerElm)

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


        headerElm.innerHTML = `
            <div class="nav">
                <a href="index.html" class="back" ><i class="fa-solid fa-arrow-left"></i></a>
                <button class="toggle" onclick="darkmodeToggle()"><i id="toggleIcon" class="fa-solid fa-toggle-off"></i></button>

            </div>

            <div class="cover"><img src="${imgURL}${movie.backdrop_path}" alt="${movie.title}"></div>       
            `
        
        mainElm.innerHTML = `
                <section class="movie-details">
                    <h1 class="movie-title">${movie.title}</h1>
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
        
    })


})

