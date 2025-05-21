import { useState } from 'react'
import Navbar from '../components/NavBar'
import { getFlag } from '../utils/flags'
import { getPosterUrl } from '../utils/imageUtilis'
import { getStarCount } from '../utils/voteUtils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons'
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons'

function Home() {
    const [films, setFilms] = useState([])

    function handleSearch(query) {
        const apiKey = '81beca33f6cd2dbe2854cf52ddd74491'
        const movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&language=it-IT`
        const tvUrl = `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${query}&language=it-IT`

        Promise.all([
            fetch(movieUrl).then(res => res.json()),
            fetch(tvUrl).then(res => res.json())
        ])
            .then(([movieData, tvData]) => {
                const movies = movieData.results.map(movie => ({ ...movie, type: 'movie' }))
                const tvShows = tvData.results.map(tv => ({ ...tv, type: 'tv' }))
                setFilms([...movies, ...tvShows])
            })
            .catch(err => console.error('Errore nella fetch:', err))
    }

    return (
        <div>
            <Navbar onSearch={handleSearch} />

            <div className="container my-4">
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                    {films.map(item => {
                        const flagImg = getFlag(item.original_language)
                        const posterUrl = getPosterUrl(item.poster_path)
                        const stars = getStarCount(item.vote_average)
                        const title = item.type === 'movie' ? item.title : item.name
                        const originalTitle = item.original_title || item.original_name
                        const overview = item.overview || 'Nessuna trama disponibile.'

                        return (
                            <div key={item.id} className="col">
                                <div className="film-card position-relative rounded overflow-hidden shadow-sm">
                                    {posterUrl && (
                                        <img src={posterUrl} alt={title} className="img-fluid poster-img" />
                                    )}

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
