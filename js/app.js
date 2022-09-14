
document.addEventListener("DOMContentLoaded", () => {

	let showingItems = document.querySelector(".showing-list")
	let popularItems = document.querySelector(".popular-list")

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
				
				showingItems.append(item)
				console.log(result.vote_average)
			})


			console.log(data)
		})


		fetch('https://api.themoviedb.org/3/movie/popular?api_key=e566d191afaba5f363a396fd59c36a61')
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


				
				popularItems.append(item)
			})
		

		})

			
			
		
		


})