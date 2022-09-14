document.addEventListener("DOMContentLoaded", () => {

	let showingList = document.querySelector(".showing-list")
	let popularList = document.querySelector(".popular-list")

	fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=e566d191afaba5f363a396fd59c36a61')
  		.then((response) => response.json())
  		.then((data) => {

			data.results.forEach(result => {
				
				let item = document.createElement("li")
				item.classList.add("item")

				item.innerHTML = `
					<img src="https://image.tmdb.org/t/p/w500/${result.poster_path}" alt="${result.title}">
					<div class="item-content">
						<h1>${result.title}</h1>
						<span class="rating"><i class="fa-solid fa-star"></i> ${result.vote_average}/10 IMDb</span>
					</div>
					`
				
				showingList.append(item)
				// console.log(result)
			})


			// console.log(data)
		})


		fetch('https://api.themoviedb.org/3/movie/popular?api_key=e566d191afaba5f363a396fd59c36a61')
  		.then((response) => response.json())
  		.then((data) => {

			data.results.forEach(result => {

				let item = document.createElement("li")
				item.classList.add("item")

				let genreIds = result.genre_ids
				let genreList = document.querySelector(".genres")


				item.innerHTML = `
					<img src="https://image.tmdb.org/t/p/w500/${result.poster_path}" alt="${result.title}">
					<div class="item-content">
						<h1>${result.title}</h1>
						<span class="rating"><i class="fa-solid fa-star"></i> ${result.vote_average}/10 IMDb</span>
						<ul class="genres"><li>test</li></ul>
						<span class="runtime"><i class="fa-regular fa-clock"></i> 1h 47m</span>
					</div>
					`


				console.log(result.genre_ids)

				popularList.append(item)
			})
		

		})

			
			
		
		


})