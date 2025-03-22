export function clearContainer(container) {
    container.innerHTML = ""
}

export function appendContainer(container, elements){
    elements.forEach(el => container.appendChild(el));
}