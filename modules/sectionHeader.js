let sectionHeader = function (headline, btnText, btnLink) {
    let element = document.createElement("header")
    element.classList.add("section-header")

    if (btnText) {
        element.innerHTML = `
        <h2 class="block-title">${headline}</h2>
        <a href="${btnLink}" class="btn">${btnText}</a>
    `

    } else {
        element.innerHTML = `
        <h2 class="block-title">${headline}</h2>
    `
    }
    
    return element
}

export default sectionHeader