import { useState } from 'react'
import Navbar from '../components/NavBar'
import { getFlag } from '../utils/flags'
import { getPosterUrl } from '../utils/imageUtilis'
import { getStarCount } from '../utils/voteUtils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons'
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons'

function Home() {
    // stato per salvare la lista di film e serie tv
    const [films, setFilms] = useState([])

    // funzione chiamata quando l'utente fa una ricerca
    function handleSearch(query) {
        const apiKey = '81beca33f6cd2dbe2854cf52ddd74491'
        const movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&language=it-IT`
        const tvUrl = `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${query}&language=it-IT`

        // prima chiamata: cerca i film
        fetch(movieUrl)
            .then(res => res.json())
            .then(movieData => {
                // aggiunge una proprietà "type" per distinguere i film
                const movies = movieData.results.map(movie => ({ ...movie, type: 'movie' }))

                // seconda chiamata: cerca le serie tv
                fetch(tvUrl)
                    .then(res => res.json())
                    .then(tvData => {
                        // aggiunge una proprietà "type" per distinguere le serie
                        const tvShows = tvData.results.map(tv => ({ ...tv, type: 'tv' }))
                        // unisce film e serie tv in un unico array
                        setFilms([...movies, ...tvShows])
                    })
                    .catch(err => console.error('Errore nella fetch delle serie TV:', err))
            })
            .catch(err => console.error('Errore nella fetch dei film:', err))
    }

    return (
        <div>
            {/* navbar con campo di ricerca */}
            <Navbar onSearch={handleSearch} />

            <div className="container my-4">
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                    {/* ciclo su tutti i risultati */}
                    {films.map(item => {
                        // recupera l'immagine della bandiera dalla lingua originale
                        const flagImg = getFlag(item.original_language)
                        // recupera l'url del poster
                        const posterUrl = getPosterUrl(item.poster_path)
                        // calcola il numero di stelle (da 1 a 5)
                        const stars = getStarCount(item.vote_average)
                        // titolo del film o serie
                        const title = item.type === 'movie' ? item.title : item.name
                        // titolo originale
                        const originalTitle = item.original_title || item.original_name
                        // trama o messaggio di default
                        const overview = item.overview || 'Nessuna trama disponibile.'

                        return (
                            <div key={item.id} className="col">
                                <div className="film-card position-relative rounded overflow-hidden shadow-sm">
                                    {/* mostra il poster se disponibile */}
                                    {posterUrl && (
                                        <img src={posterUrl} alt={title} className="img-fluid poster-img" />
                                    )}

                                    {/* overlay con le info del film o serie */}
                                    <div className="film-overlay text-white p-3">
                                        <h5>{title} ({item.type.toUpperCase()})</h5>
                                        <p><strong>Titolo originale:</strong> {originalTitle}</p>
                                        <p>
                                            <strong>Lingua:</strong>{' '}
                                            {flagImg ? (
                                                <img className="flag-img ms-1" src={flagImg} alt={item.original_language} />
                                            ) : (
                                                item.original_language
                                            )}
                                        </p>
                                        <p>
                                            <strong>Voto:</strong>{' '}
                                            {/* mostra le stelle piene e vuote in base al voto */}
                                            {[...Array(5)].map((_, index) => (
                                                <FontAwesomeIcon
                                                    key={index}
                                                    icon={index < stars ? solidStar : regularStar}
                                                />
                                            ))}
                                        </p>
                                        <p><strong>Trama:</strong> {overview}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Home
