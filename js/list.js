document.addEventListener("DOMContentLoaded", () => { 
 
    let wrapperELm = document.querySelector(".wrapper")

    let headerElm = document.createElement("header")
    headerElm.classList.add("header", "list-header")
    wrapperELm.append(headerElm)

    let siteTitle = document.createElement("h1")
	siteTitle.classList.add("site-title")
    siteTitle.innerText = `myLists`
	headerElm.append(siteTitle)

    let headerNav = document.createElement("div")
	headerNav.classList.add("nav")
    headerNav.innerHTML = `
        <a href="index.html" class="back" ><i class="fa-solid fa-arrow-left"></i></a>
        <button class="toggle" onclick="darkmodeToggle()"><i id="toggleIcon" class="fa-solid fa-toggle-off"></i></button>
        `
	headerElm.append(headerNav)

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
    movieList.setAttribute('id', 'card-container') 
    movieList.classList.add("ml")
    sectionElm.append(movieList)

    let params = new URLSearchParams(window.location.search) 
    let id = params.get("id")
    
    let blockTitle = document.createElement("h1")
	blockTitle.classList.add("block-title")

    if (id == "popular") {
        blockTitle.innerText = `Popular`
    } else if (id == "now_playing") {
        blockTitle.innerText = `Now Showing`
    }

	contentHeader.append(blockTitle)

    let popularPage = 1

    function fetchPopular(page) {

        fetch(`${baseURL}/movie/${id}?api_key=${apikey}&page=${page}`)
        .then((response) => response.json())
        .then((data) => {

            data.results.forEach((movie, index) => {

                let listItem = document.createElement("li")
                listItem.classList.add("ml-item")

                let movieURL = `detail.html?id=${movie.id}`

                listItem.innerHTML = `
                    <a href="${movieURL}"><img src="https://placehold.jp/10/fff/aaa/85x127.png?text=Loading" alt="${movie.title}"></a>
                    <div class="item-content">
                        <h1><a href="${movieURL}">${movie.title}</a></h1>
                        <span class="movie-rating"><i class="fa-solid fa-star"></i> ${movie.vote_average}/10 IMDb</span>
                        <ul class="movie-genres"></ul>
                        <span class="movie-runtime"></span>
                    </div>
                `

                movieList.append(listItem)

                fetch(`${baseURL}/movie/${movie.id}?api_key=${apikey}`)
                .then(response => response.json())
                .then(details => {

                    let runtimeElme = listItem.querySelector(".movie-runtime")

                    runtimeElme.innerHTML = `<i class="fa-regular fa-clock"></i> ${timeConvert(details.runtime)}`
                
                    let genreList = listItem.querySelector(".movie-genres")

					movie.genre_ids.forEach(id => {

						let currentGenre = genres.find(genre => genre.id == id)

						let genreItem = document.createElement("li")
						
						genreItem.innerText = currentGenre.name

						genreList.append(genreItem)

					})

                })


                let imgElm = listItem.querySelector("img")
                let posterImg = new Image()

                posterImg.src = `${imgURL}${movie.poster_path}`

                posterImg.onload = () => {
                    imgElm.src = posterImg.src
                }


                if (index === 18) {
                    const intersectionObserver = new IntersectionObserver((entries) => {

                    if (entries[0].intersectionRatio <= 0) return

                        popularPage++
                        console.log('in the viewport')
                        fetchPopular(popularPage)
                        intersectionObserver.unobserve(listItem)
                    })

                    intersectionObserver.observe(listItem)

                }
            })
        })
    }

    fetchPopular(popularPage)
    setDarkmode() 

})