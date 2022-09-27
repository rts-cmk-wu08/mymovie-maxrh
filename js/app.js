document.addEventListener("DOMContentLoaded", () => {

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

	let showingHeader = document.createElement("header")
	showingHeader.classList.add("section-header")
	showingElm.append(showingHeader)

	let showingList = document.createElement("ul")
	showingList.classList.add("ml", "ml-horizontal", "showing-list")
	showingElm.append(showingList)

	let popularElm = document.createElement("section")
	popularElm.classList.add("popular")
	mainElm.append(popularElm)

	let popularHeader = document.createElement("header")
	popularHeader.classList.add("section-header")
	popularElm.append(popularHeader)

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
	
	showingHeader.innerHTML = `
			<h1 class="block-title">Now Showing</h1>
			<a href="list.html?id=now_playing" class="btn">See more</a>
		`

	popularHeader.innerHTML = `
			<h1 class="block-title">Popular</h1>
			<a href="list.html?id=popular" class="btn">See more</a>
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

						let currentGenre = genres.find(genre => genre.id == id)

						let genreItem = document.createElement("li")
						
						genreItem.innerText = currentGenre.name

						genreList.append(genreItem)

					})


				})


			})

		})




		setDarkmode()

})