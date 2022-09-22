document.addEventListener("DOMContentLoaded", () => {

    window.onload = function setDarkmode() {

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
            } else {
                return
            }
    }
    


})