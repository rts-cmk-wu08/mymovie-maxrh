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

	let popularElm = document.createElement("section")
	popularElm.classList.add("popular")
	mainElm.append(popularElm)
   

	let showingList = document.createElement("ul")
	showingList.classList.add("showing-list")
	showingElm.append(showingList)

	let popularList = document.createElement("ul")
	popularList.classList.add("popular-list")
	popularElm.append(popularList)

	let footerElm = document.createElement("footer")
    footerElm.classList.add("footer", "frontpage-footer")
    wrapperELm.append(footerElm)


	headerElm.innerHTML = `
			<h1 class="site-title">MyMovies</h1>
			<span class="toggle"><i class="fa-solid fa-toggle-off"></i></span>
		`

	fetch(`${baseURL}/movie/now_playing?api_key=${apikey}`)
  		.then((response) => response.json())
  		.then((data) => {

			data.results.forEach(movie => {
				
				let listItem = document.createElement("li")
				listItem.classList.add("listItem")

				listItem.innerHTML = `
					<img src="${imgURL}${movie.poster_path}" alt="${movie.title}">
					<div class="item-content">
						<h1>${movie.title}</h1>
						<span class="movie-rating"><i class="fa-solid fa-star"></i> ${movie.vote_average}/10 IMDb</span>
					</div>
					`
				
				showingList.append(listItem)
			})
		})


	fetch(`${baseURL}/movie/popular?api_key=${apikey}`)
  		.then((response) => response.json())
  		.then((data) => {

			data.results.forEach(movie => {

				fetch(`${baseURL}/movie/${movie.id}?api_key=${apikey}`)
					.then(response => response.json())
					.then(details => {

					console.log(details.runtime)

					let listItem = document.createElement("li")
					listItem.classList.add("listItem")

					listItem.innerHTML = `
						<img src="${imgURL}${movie.poster_path}" alt="${movie.title}">
						<div class="item-content">
							<h1>${movie.title}</h1>
							<span class="movie-rating"><i class="fa-solid fa-star"></i> ${movie.vote_average}/10 IMDb</span>
							<ul class="movie-genres"></ul>
							<span class="movie-runtime"><i class="fa-regular fa-clock"></i> ${timeConvert(details.runtime)}</span>
						</div>
						`

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






})