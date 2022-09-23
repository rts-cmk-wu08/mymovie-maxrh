document.addEventListener("DOMContentLoaded", () => { 


    let wrapperELm = document.querySelector(".wrapper")

    let headerElm = document.createElement("header")
    headerElm.classList.add("header", "list-header")
    wrapperELm.append(headerElm)

    let mainElm = document.createElement("main")
    mainElm.classList.add("main")
    wrapperELm.append(mainElm)

    let sectionElm = document.createElement("section")
	sectionElm.classList.add("content")
	mainElm.append(sectionElm)

	let contentHeader = document.createElement("header")
	contentHeader.classList.add("section-header")
	sectionElm.append(contentHeader)

	let movieList = document.createElement("ul")
	movieList.classList.add("ml")
	sectionElm.append(movieList)



    headerElm.innerHTML = `
			<h1 class="site-title">Lists</h1>
			<div class="nav">
				<button class="toggle" onclick="darkmodeToggle()"><i id="toggleIcon" class="fa-solid fa-toggle-off"></i></button>
			</div>
		`
	
    contentHeader.innerHTML = `
			<h1 class="block-title">Now Showing</h1>
		`



    fetch(`${baseURL}/movie/popular?api_key=${apikey}`)
        .then((response) => response.json())
        .then((data) => {

            data.results.forEach(movie => {

                fetch(`${baseURL}/movie/${movie.id}?api_key=${apikey}`)
                    .then(response => response.json())
                    .then(details => {

                    let listItem = document.createElement("li")
                    listItem.classList.add("ml-item")

                    let movieURL = `detail.html?id=${movie.id}`

                    listItem.innerHTML = `
                        <a href="${movieURL}"><img src="${imgURL}${movie.poster_path}" alt="${movie.title}"></a>
                        <div class="item-content">
                            <h1><a href="${movieURL}">${movie.title}</a></h1>
                            <span class="movie-rating"><i class="fa-solid fa-star"></i> ${movie.vote_average}/10 IMDb</span>
                            <ul class="movie-genres"></ul>
                            <span class="movie-runtime"><i class="fa-regular fa-clock"></i> ${timeConvert(details.runtime)}</span>
                        </div>
                        `

                    movieList.append(listItem)

                    let genreList = listItem.querySelector(".movie-genres")

                    movie.genre_ids.forEach(id => {

                        let currentGenre = genres.find(genre => genre.id == id)

                        let genreItem = document.createElement("li")
                        
                        genreItem.innerText = currentGenre.name

                        genreList.append(genreItem)

                    })


                })


            })

        })






})
