
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

function setDarkmode() {

    let buttonIcon = document.getElementById("toggleIcon")

    if ( localStorage.getItem("darkmode") !== null ) {
        if ( localStorage.getItem("darkmode") == "true" ) {
            bodyElm.classList.add("darkmode")

            if ( buttonIcon.classList.contains("fa-toggle-off") ) {
                buttonIcon.classList.toggle("fa-toggle-off")
                buttonIcon.classList.toggle("fa-toggle-on")
            } else {
                buttonIcon.classList.add("fa-toggle-on")
            }

        } else {
            bodyElm.classList.remove("darkmode")
        }
    } else {
        return
    }
}

function darkmodeToggle() {
    
    let buttonIcon = document.getElementById("toggleIcon")

    buttonIcon.classList.toggle("fa-toggle-off")
    buttonIcon.classList.toggle("fa-toggle-on")

    if (localStorage.getItem("darkmode") !== null) {
        if (localStorage.getItem("darkmode") == "true") {
            localStorage.setItem("darkmode", "false")
            bodyElm.classList.remove("darkmode")
        } else {
            localStorage.setItem("darkmode", "true")
            bodyElm.classList.add("darkmode")
        }
    } else {
        localStorage.setItem("darkmode", "true")
        bodyElm.classList.add("darkmode")
    } 

}