let header = function() {
    let element = document.createElement("header")
    element.classList.add("header")

    element.innerHTML = `
        <h1>MyHeader</h1>
    `
    return element
}

export default header;