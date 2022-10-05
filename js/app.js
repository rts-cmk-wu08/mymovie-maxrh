
    import { makeElement } from "../modules/makeElement.js"
    import genreSpan from "../modules/genreSpan.js"
    import sectionHeader from "../modules/sectionHeader.js"

	let wrapperELm = document.querySelector(".wrapper")

    let headerElm = document.createElement("header")
    headerElm.classList.add("header", "frontpage-header")
    wrapperELm.append(headerElm)

    let mainElm = document.createElement("main")
    mainElm.classList.add("content", "frontpage-content")
    wrapperELm.append(mainElm)

	let showingElm = document.createElement("section")
	showingElm.classList.add("showing")
	mainElm.append(showingElm)
	
	showingElm.append(sectionHeader("Now Showing", "See more", "list.html?id=now_playing"))

	let showingList = document.createElement("ul")
	showingList.classList.add("ml", "ml-horizontal", "showing-list")
	showingElm.append(showingList)

	let popularElm = document.createElement("section")
	popularElm.classList.add("popular")
	mainElm.append(popularElm)

	popularElm.append(sectionHeader("Popular", "See more", "list.html?id=popular"))

	let popularList = document.createElement("ul")
	popularList.classList.add("ml", "popular-list")
	popularElm.append(popularList)

	let footerElm = document.createElement("footer")
    footerElm.classList.add("footer", "frontpage-footer")
    wrapperELm.append(footerElm)


	headerElm.innerHTML = `
			<h1 class="site-title">myMovies</h1>
			<div class="nav">
				<button class="toggle" onclick="darkmodeToggle()"><i id="toggleIcon" class="fa-solid fa-toggle-off"></i></button>
			</div>
		`
	
	fetch(`${baseURL}/movie/now_playing?api_key=${apikey}`)
  		.then((response) => response.json())
  		.then((data) => {

			data.results.forEach(movie => {
				
				let listItem = document.createElement("li")
				listItem.classList.add("ml-item")

				let movieURL = `detail.html?id=${movie.id}`

				listItem.innerHTML = `
                    <a href="${movieURL}"><img src="https://placehold.jp/10/fff/aaa/85x127.png?text=Loading" alt="${movie.title}"></a>
					<div class="item-content">
						<h1><a href="${movieURL}">${movie.title}</a></h1>
						<span class="movie-rating"><i class="fa-solid fa-star"></i> ${movie.vote_average}/10 IMDb</span>
					</div>
					`
				
				showingList.append(listItem)

				let imgElm = listItem.querySelector("img")
				let posterImg = new Image()

				posterImg.src = `${imgURL}${movie.poster_path}`

				posterImg.onload = () => {
					imgElm.src = posterImg.src
				}

				
			})
		})


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
                    	<a href="${movieURL}"><img src="https://placehold.jp/10/fff/aaa/85x127.png?text=Loading" alt="${movie.title}"></a>
						<div class="item-content">
							<h1><a href="${movieURL}">${movie.title}</a></h1>
							<span class="movie-rating"><i class="fa-solid fa-star"></i> ${movie.vote_average}/10 IMDb</span>
							<ul class="movie-genres"></ul>
							<span class="movie-runtime"><i class="fa-regular fa-clock"></i> ${timeConvert(details.runtime)}</span>
						</div>
						`

					let imgElm = listItem.querySelector("img")
					let posterImg = new Image()

					posterImg.src = `${imgURL}${movie.poster_path}`

					posterImg.onload = () => {
						imgElm.src = posterImg.src
					}


					popularList.append(listItem)

					let genreList = listItem.querySelector(".movie-genres")

					movie.genre_ids.forEach(id => {

						genreList.append(genreSpan(id))

					})


				})


			})

		})




		setDarkmode()
