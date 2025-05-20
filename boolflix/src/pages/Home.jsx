import { useState } from 'react'
import Navbar from '../components/NavBar'

function Home() {
    const [films, setFilms] = useState([])

    function handleSearch(query) {
        const apiKey = '81beca33f6cd2dbe2854cf52ddd74491'
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&language=it-IT`

        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                setFilms(data.results)
            })
            .catch((err) => {
                console.log('Errore nella fetch:', err)
            })
    }

    return (
        <div>
            <Navbar onSearch={handleSearch} />

            <div>
                {films.map((film) => (
                    <div key={film.id}>
                        <h3>{film.title}</h3>
                        <p>Titolo originale: {film.original_title}</p>
                        <p>Lingua: {film.original_language}</p>
                        <p>Voto: {film.vote_average}</p>
                        <hr />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home
