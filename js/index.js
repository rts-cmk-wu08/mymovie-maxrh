
const apikey = "e566d191afaba5f363a396fd59c36a61"
const baseURL = "https://api.themoviedb.org/3"
const imgURL = "https://image.tmdb.org/t/p/w500"

const bodyElm = document.querySelector("body")


function timeConvert(n) {
    let num = n
    let hours = (num / 60)
    let rhours = Math.floor(hours)
    let minutes = (hours - rhours) * 60
    let rminutes = Math.round(minutes)

    return rhours + "h  " + rminutes + "min"
}



function darkmodeToggle() {

    let toggleIcon = document.getElementById("toggleIcon")

    toggleIcon.classList.toggle("fa-toggle-off")
    toggleIcon.classList.toggle("fa-toggle-on")

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

    let toggleIcon = document.getElementById("toggleIcon")

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
