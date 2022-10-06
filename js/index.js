const apikey = "e566d191afaba5f363a396fd59c36a61"
const baseURL = "https://api.themoviedb.org/3"
const imgURL = "https://image.tmdb.org/t/p/w500"

const bodyElm = document.querySelector("body")
const wrapperELm = document.querySelector(".wrapper")

const headerElm = document.createElement("header")
headerElm.classList.add("header")
wrapperELm.append(headerElm)

const pageTitle = document.createElement("h1")
pageTitle.classList.add("page-title")
headerElm.append(pageTitle)

const pageNav = document.createElement("div")
pageNav.classList.add("nav")
headerElm.append(pageNav)

pageNav.innerHTML = `
        <a class="back" onclick="history.back()"><i class="fa-solid fa-arrow-left"></i></a>
		<button class="toggle" onclick="darkmodeToggle()"><i id="toggleIcon" class="fa-solid fa-toggle-off"></i></button>
	`

const mainElm = document.createElement("main")
mainElm.classList.add("main")
wrapperELm.append(mainElm)

const footerElm = document.createElement("footer")
footerElm.classList.add("footer")
wrapperELm.append(footerElm)




function darkmodeToggle() {
    let element = document.getElementById("toggleIcon")

    element.classList.toggle("fa-toggle-off")
    element.classList.toggle("fa-toggle-on")

    if (localStorage.getItem("darkmode") !== null) {
        if (localStorage.getItem("darkmode") == "true") {
            localStorage.setItem("darkmode", "false")
            bodyElm.classList.remove("darkmode")
            bodyElm.classList.remove("darkmode-on")
            bodyElm.classList.add("darkmode-off")
        } else {
            localStorage.setItem("darkmode", "true")
            bodyElm.classList.add("darkmode-on")
            bodyElm.classList.remove("darkmode-off")
        }
    } else {
        localStorage.setItem("darkmode", "true")
        bodyElm.classList.add("darkmode-on")
        bodyElm.classList.remove("darkmode")
    } 
}

function setDarkmode() {
    const toggleIcon = document.getElementById("toggleIcon")

    if ( localStorage.getItem("darkmode") !== null ) {
        if ( localStorage.getItem("darkmode") == "true" ) {
            bodyElm.classList.add("darkmode")
            toggleIcon.classList.add("fa-toggle-on")
            toggleIcon.classList.remove("fa-toggle-off")

        } else {
            bodyElm.classList.remove("darkmode")
            toggleIcon.classList.add("fa-toggle-off")
            toggleIcon.classList.remove("fa-toggle-on")
        }
    } 
}

