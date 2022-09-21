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
        .then(data => {

        let vote = data.vote_average.toFixed(1)
    
        headerElm.innerHTML = `
            <button class="toggle" onclick="darkmodeToggle()"><i id="toggleIcon" class="fa-solid fa-toggle-off"></i></button>
            <div class="cover"><img src="${imgURL}${data.backdrop_path}" alt="${data.title}"></div>       
            `
        
        mainElm.innerHTML = `
                <section class="movie-details">
                    <h1 class="movie-title">${data.title}</h1>
                    <span class="movie-rating"><i class="fa-solid fa-star"></i> ${vote}/10 IMDb</span>
                    <ul class="movie-genres"></ul>
                    <ul class="movie-info">
                        <li class="movie-info__length">Length<br> <strong>${timeConvert(data.runtime)}</strong></li>
                        <li class="movie-info__language">Language<br> <strong>${data.original_language}</strong></li>
                        <li class="movie-info__cert">Rating<br> <strong>${data.certification}</strong></li>
                    </ul>
                </section>
                <section class="movie-description">
                    <h2 class="block-title">Description</h2>
                    <p>${data.overview}</p>
                </section>
                <section class="movie-cast">
                    <h2 class="block-title">Cast</h2>
                    <ul class="movie-cast__list"></ul>
                </section>
            `
			
            let genreList = document.querySelector(".movie-genres")

            data.genres.forEach(genre => {

                let genreItem = document.createElement("li")
						
				genreItem.innerText = genre.name
                
                genreList.append(genreItem)


                console.log(genre)
            })

           






        fetch(`${baseURL}/movie/${data.id}/credits?api_key=${apikey}`)
            .then(response => response.json())
            .then(credits => {

                let casts = credits.cast
                let castList = document.querySelector(".movie-cast__list")

                casts.forEach(cast => {
            
                    let listItem = document.createElement("li")
                    listItem.classList.add("listItem")
    
                    listItem.innerHTML = `
                        <img src="${imgURL}${cast.profile_path}" alt="${cast.name}">
                        <h1>${cast.name}</h1>
                        `
                    
                    castList.append(listItem)
                
                })
            
        })
        
    })

})

