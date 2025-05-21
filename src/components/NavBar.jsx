import { useState } from 'react';
import LogoB from '../utils/logo';

function Navbar({ onSearch }) {
    // stato per salvare il testo digitato dall'utente
    const [query, setQuery] = useState('');

    // aggiorna lo stato quando l'utente scrive nel campo input
    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    // esegue la ricerca solo se il campo non è vuoto
    const handleSearchClick = () => {
        if (query.trim() !== '') {
            onSearch(query);
        }
    };

    return (
        // navbar con sfondo nero
        <nav className="navbar navbar-expand-lg navbar-dark bg-black px-3">
            {/* logo a sinistra */}
            <a className="navbar-brand d-flex align-items-center" href="#">
                <img src={LogoB} alt="Logo" width="100" className="me-2" />
            </a>

            {/* bottone per aprire/chiudere il menu su schermi piccoli */}
            <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarContent"
                aria-controls="navbarContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            {/* contenuto della navbar (form di ricerca) */}
            <div className="collapse navbar-collapse justify-content-end" id="navbarContent">
                <form
                    className="d-flex mt-2 mt-lg-0"
                    onSubmit={(e) => {
                        e.preventDefault(); // evita il refresh della pagina
                        handleSearchClick(); // chiama la funzione di ricerca
                    }}
                >
                    {/* campo di ricerca */}
                    <input
                        className="form-control me-2 bg-dark text-white border-secondary"
                        type="search"
                        placeholder="Cerca un film..."
                        value={query}
                        onChange={handleInputChange}
                    />
                    {/* bottone per avviare la ricerca */}
                    <button className="btn btn-outline-danger" type="submit">
                        Cerca
                    </button>
                </form>
            </div>
        </nav>
    );
}

export default Navbar;
