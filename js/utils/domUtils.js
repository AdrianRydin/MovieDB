export function clearContainer(container) { // Rensar en container så att inget extra finns inom den
    container.innerHTML = ""
}

export function appendContainer(container, elements){ // En generaliserad funktion för att appenda ett element till en container
    elements.forEach(el => container.appendChild(el));
}