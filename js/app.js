import makeElement from "../modules/makeElement.js"
import genreSpan from "../modules/genreSpan.js"
import sectionHeader from "../modules/sectionHeader.js"
import timeConvert from "../modules/timeConvert.js"

pageTitle.innerText = `myMovies`
		
let showingElm = makeElement("section", "showing")
mainElm.append(showingElm)
	
showingElm.append(sectionHeader("Now Showing", "See more", "list.html?id=now_playing"))

let showingList = makeElement("ul", "ml", "ml-horizontal", "showing-list")
showingElm.append(showingList)

let popularElm = makeElement("section", "popular")
mainElm.append(popularElm)

popularElm.append(sectionHeader("Popular", "See more", "list.html?id=popular"))

let popularList = makeElement("ul", "ml", "popular-list")
popularElm.append(popularList)

	
	fetch(`${baseURL}/movie/now_playing?api_key=${apikey}`)
  		.then((response) => response.json())
  		.then((data) => {

			data.results.forEach(movie => {

				let listItem = makeElement("li", "ml-item")
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

					let listItem = makeElement("li", "ml-item")

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

					popularList.append(listItem)

					let imgElm = listItem.querySelector("img")
					let posterImg = new Image()

					posterImg.src = `${imgURL}${movie.poster_path}`

					posterImg.onload = () => {
						imgElm.src = posterImg.src
					}

					let genreList = listItem.querySelector(".movie-genres")

					movie.genre_ids.forEach(id => {

						genreList.append(genreSpan(id))

					})

				})

			})

		})

	setDarkmode()