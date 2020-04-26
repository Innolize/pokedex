export async function obtenerDatosListaPokemonAPI(URL = "https://pokeapi.co/api/v2/pokemon") {
    const r = await fetch(URL)
    const rJSON = await r.json()

    return rJSON
}

export async function obtenerDatosPokemonAPI(pokemon = "bulbasaur") {
    const URL = (`https://pokeapi.co/api/v2/pokemon/${pokemon}/`)
    const r = await fetch(URL)
    const rJSON = await r.json()
    const nuevoPokemon = new Pokemon(rJSON)
    console.log(nuevoPokemon)
    return nuevoPokemon
}

class Pokemon {
    constructor(rFetch) {
        this.abilities = rFetch.abilities
        this.forms = rFetch.forms
        this.game_indices = rFetch.game_indices
        this.height = rFetch.height
        this.held_items = rFetch.held_items
        this.id = rFetch.id
        this.moves = rFetch.moves
        this.name = rFetch.name
        this.species = rFetch.species
        this.sprites = rFetch.sprites
        this.stats = rFetch.stats
        this.types = rFetch.types
        this.weight = rFetch.weight
    }
}
