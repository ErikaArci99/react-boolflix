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

            <div>
                {films.map(item => {
                    const flagImg = getFlag(item.original_language)
                    const posterUrl = getPosterUrl(item.poster_path)
                    const stars = getStarCount(item.vote_average)

                    return (
                        <div key={item.id}>
                            <h3>
                                {item.type === 'movie' ? item.title : item.name} ({item.type.toUpperCase()})
                            </h3>

                            {posterUrl && (
                                <img src={posterUrl} alt={item.title || item.name} />
                            )}

                            <p>Titolo originale: {item.original_title || item.original_name}</p>

                            <p>
                                Lingua:{' '}
                                {flagImg ? (
                                    <img className="flag-img" src={flagImg} alt={item.original_language} />
                                ) : (
                                    item.original_language
                                )}
                            </p>

                            <p>
                                Voto:{' '}
                                {[...Array(5)].map((_, index) => (
                                    <FontAwesomeIcon
                                        key={index}
                                        icon={index < stars ? solidStar : regularStar}
                                    />
                                ))}
                            </p>

                            <p>Trama: {item.overview || 'Nessuna trama disponibile.'}</p>

                            <hr />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Home
