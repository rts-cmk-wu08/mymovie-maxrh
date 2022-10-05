let darkmodeToggle = function(idName) {

    let toggleIcon = document.getElementById(idName)

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

export default darkmodeToggle