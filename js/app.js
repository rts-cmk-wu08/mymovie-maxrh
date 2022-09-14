
// "DOMContentLoaded" event'en sørger for, at Javascriptet først kører når hele HTML dokumentet er indlæst
document.addEventListener("DOMContentLoaded", () => {

	let items = document.querySelector(".showing-list")


	fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=e566d191afaba5f363a396fd59c36a61')
  		.then((response) => response.json())
  		.then((data) => {

			data.results.forEach(result => {
				
				let item = document.createElement("li")
				item.classList.add("item")

				item.innerHTML = `
					<h1>${result.original_title}</h1>
					`


				
				items.append(item)


				console.log(result)


			})
		


			console.log(data)

		})

			
			
		
		


})