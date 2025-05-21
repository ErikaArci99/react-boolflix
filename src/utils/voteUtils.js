// funzione che calcola quante stelle visualizzare in base al voto
// il voto è su una scala da 1 a 10, lo convertiamo in stelle da 1 a 5
// arrotonda sempre per eccesso
export function getStarCount(vote) {
    return Math.ceil(vote / 2)
}