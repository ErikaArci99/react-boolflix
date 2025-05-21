import itFlag from '../assets/flags/it.jpg'
import enFlag from '../assets/flags/en.png'

const flags = {
    it: itFlag,
    en: enFlag,
}

export function getFlag(lang) {
    return flags[lang] || null
}