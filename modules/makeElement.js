let makeElement = function(elmName, className, className2, className3) {

    let element = document.createElement(elmName)

    if (className) {
        element.classList.add(className)
    }

    if (className2) {
        element.classList.add(className2)
    }

    if (className3) {
        element.classList.add(className3)
    }

    return element;

}

export default makeElement