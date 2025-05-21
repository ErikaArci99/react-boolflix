// importa le immagini delle bandiere
import itFlag from '../assets/flags/it.jpg'
import enFlag from '../assets/flags/en.png'

// oggetto che associa i codici lingua alle rispettive bandiere
const flags = {
    it: itFlag,
    en: enFlag,
}

// funzione che restituisce l'immagine della bandiera in base al codice lingua
// se la lingua non è presente, restituisce null
export function getFlag(lang) {
    return flags[lang] || null
}
