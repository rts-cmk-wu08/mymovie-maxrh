let sectionHeader = function (text) {
    let element = document.createElement("header")

    element.innerHTML = `
        <h2>${text}</h2>
    `
    
    return element
}

export default sectionHeader