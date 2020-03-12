import {
    primerLetraMayus,
} from "../utilidades.js"

let siguienteURL
let anteriorURL

export async function mostrarListaPokemon(URL) {
    const r = await fetch(URL)
    const rJSON = await r.json()
    Object.keys(rJSON.results).forEach(pokemones => {
        let numeroPokemonLista = obtenerNumeroPokemon(rJSON.results[pokemones].url)
        let pokemon = rJSON.results[pokemones].name
        $("#data").append($(`<tr><td class="border px-4 py-2 cursor-pointer" data-pokemon="${pokemon}">${primerLetraMayus(pokemon)}</td><td class="border px-4 py-2">${numeroPokemonLista}</td>`))

    })
    siguienteURL = rJSON.next
    anteriorURL = rJSON.previous
}

function obtenerNumeroPokemon(elemento) {
    let numeroPokemon = elemento.substr(elemento.length - 5)
    return numeroPokemon.replace(/[^0-9]/g, '');
}

export function configurarBotones() {
    $("#siguiente").click(() => {
        if (siguienteURL === null) {
            return;
        } else {
            $("#data").html("")
            mostrarListaPokemon(siguienteURL)
        }
    })

    $("#anterior").click(() => {
        if (anteriorURL === null) {
            return;
        } else {
            $("#data").html("")
            mostrarListaPokemon(anteriorURL)
        }
    })

}
