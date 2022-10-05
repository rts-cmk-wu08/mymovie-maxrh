export let makeElement = function(elmName, className) {
    let element = document.createElement(elmName)
    element.classList.add(className)
    return element;
};