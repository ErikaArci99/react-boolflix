import './App.css'
// importa gli strumenti per usare le rotte
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// importa la pagina principale
import Home from './pages/Home'

function App() {
  return (
    // avvolge tutta l'app con il router per gestire le rotte
    <Router>
      {/* contiene tutte le rotte dell'app */}
      <Routes>
        {/* rotta principale: quando l'URL è "/" mostra il componente Home */}
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App