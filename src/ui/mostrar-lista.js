import {
    primerLetraMayus,
} from "../utilidades.js"

export async function obtenerDatosListaPokemon(URL) {
    const r = await fetch(URL)
    const rJSON = await r.json()

    return rJSON
}

export function mostrarListaPokemon(rJSON) {
    Object.keys(rJSON.results).forEach(pokemones => {
        let numeroPokemonLista = obtenerNumeroPokemon(rJSON.results[pokemones].url)
        let pokemon = rJSON.results[pokemones].name
        $("#data").append($(`<tr><td class="border px-4 py-2 cursor-pointer" data-pokemon="${pokemon}">${primerLetraMayus(pokemon)}</td><td class="border px-4 py-2">${numeroPokemonLista}</td>`))

    })
}

function obtenerNumeroPokemon(elemento) {
    let numeroPokemon = elemento.substr(elemento.length - 5)
    return numeroPokemon.replace(/[^0-9]/g, '');
}

