export function getPosterUrl(path, size = 'w342') {
    if (!path) return null
    return `https://image.tmdb.org/t/p/${size}${path}`
}