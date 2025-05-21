import { useState } from 'react';
import LogoB from '../utils/logo';

function Navbar({ onSearch }) {
    const [query, setQuery] = useState('');

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSearchClick = () => {
        if (query.trim() !== '') {
            onSearch(query);
        }
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-black px-3">
            <a className="navbar-brand d-flex align-items-center" href="#">
                <img src={LogoB} alt="Logo" width="100" className="me-2" />
            </a>

            {/* Hamburger button per mobile */}
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

            <div className="collapse navbar-collapse justify-content-end" id="navbarContent">
                <form
                    className="d-flex mt-2 mt-lg-0"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSearchClick();
                    }}
                >
                    <input
                        className="form-control me-2 bg-dark text-white border-secondary"
                        type="search"
                        placeholder="Cerca un film..."
                        value={query}
                        onChange={handleInputChange}
                    />
                    <button className="btn btn-outline-danger" type="submit">
                        Cerca
                    </button>
                </form>
            </div>
        </nav>
    );
}

export default Navbar;