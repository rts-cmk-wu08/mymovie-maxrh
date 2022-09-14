document.addEventListener("DOMContentLoaded", () => {

    let content = document.querySelector(".content")
    let cover = document.querySelector(".cover")

    let params = new URLSearchParams(window.location.search) 
    let id = params.get("id")

   
    console.log(id)  

    function timeConvert(n) {
        let num = n
        let hours = (num / 60)
        let rhours = Math.floor(hours)
        let minutes = (hours - rhours) * 60
        let rminutes = Math.round(minutes)

        return rhours + "h  " + rminutes + "min"
    }
        

    fetch(`https://api.themoviedb.org/3/movie/539681?api_key=e566d191afaba5f363a396fd59c36a61&append_to_response=videos`)
        .then(response => response.json())
        .then(data => {


        cover.innerHTML = `
                <img src="https://image.tmdb.org/t/p/w500/${data.backdrop_path}" alt="${data.title}">

            `


        content.innerHTML = `
                <h1>${data.title}</h1>
                <span class="rating"><i class="fa-solid fa-star"></i> ${data.vote_average}/10 IMDb</span>
                <ul class="details">
                    <li class="length">Length<br> <strong>${timeConvert(data.runtime)}</strong></li>
                    <li class="language">Language<br> <strong></strong></li>
                    <li class="cert">Rating<br> <strong>${data.certification}</strong></li>
                </ul>

            `

            let langElm = document.querySelector(".language strong")

            let langLists = data.spoken_languages

            langLists.forEach((langList) => {

                let langName = Object.values(langList)[0]

				langElm.append(langName)

                console.log(JSON.stringify(langName))
                
            })


            let arr = Object.values(data.spoken_languages)

        


            //console.log(Object.values(arr))

            console.log(arr)

        })

})

