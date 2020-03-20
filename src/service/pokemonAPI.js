export async function obtenerDatosListaPokemonAPI(URL="https://pokeapi.co/api/v2/pokemon") {
    const r = await fetch(URL)
    const rJSON = await r.json()

    return rJSON
}

export async function obtenerDatosPokemonAPI(pokemon="bulbasaur") {
    const URL = (`https://pokeapi.co/api/v2/pokemon/${pokemon}/`)
    const r = await fetch(URL)
    const rJSON = await r.json()

    return rJSON
}