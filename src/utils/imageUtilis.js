// funzione che restituisce l'URL completo del poster
// accetta il path dell'immagine e una dimensione (di default 'w342')
export function getPosterUrl(path, size = 'w342') {
    // se il path non esiste, restituisce null
    if (!path) return null

    // restituisce l'URL completo dell'immagine
    return `https://image.tmdb.org/t/p/${size}${path}`
}