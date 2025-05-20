import { useState } from 'react'

function Navbar({ onSearch }) {
    const [query, setQuery] = useState('')

    const handleInputChange = (e) => {
        setQuery(e.target.value)
    }

    const handleSearchClick = () => {
        if (query.trim() !== '') {
            onSearch(query)
        }
    }

    return (
        <nav>
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="Cerca un film..."
            />
            <button onClick={handleSearchClick}>Cerca</button>
        </nav>
    )
}

export default Navbar
