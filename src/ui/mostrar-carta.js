import {
    agregarCeros,
    primerLetraMayus,
    traducirEspaniol
} from "../utilidades.js"

export async function mostrarPokemonSeleccionado(rJSON) {
    mostrarMiniDescripcion(rJSON)
    mostrarNumeroYNombrePokemon(rJSON)
    mostrarImagenPokemon(rJSON)
    mostrarStatsPokemon(rJSON)
    mostrarDescripcion(rJSON)
    mostrarTipo(rJSON)
    manejarHabilidades(rJSON)
}
async function manejarHabilidades(rJSON) {
    const habilidades = await obtenerHabilidad(rJSON)
    const habilidadesEspaniol = await traducirEspaniol(habilidades)
    mostrarHabilidad(habilidadesEspaniol)
}

function mostrarTipo(rJSON) {
    $("#tipos").html("")
    rJSON.types.forEach(types => {
        $("#tipos").append(`<img src="img/Tipos/${types.type.name}.gif"/>`)
    })
}

async function mostrarMiniDescripcion(elemento) {
    const r = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${elemento.id}/`)
    const rJSON = await r.json()
    let miniDescripcion = rJSON.genera.find((x) =>
        x.language.name === "es");
    $("#mini-descripcion").text(miniDescripcion.genus)
}

function mostrarNumeroYNombrePokemon(rJSON) {
    $("#id-pokemon").text(`Nº ${rJSON.id} ${primerLetraMayus(rJSON.name)}`)
}

function obtenerImagenPokemon(id) {
    const URLFoto = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${agregarCeros(id, 3)}.png`
    return URLFoto;
}

function mostrarImagenPokemon(rJSON) {
    $("#imagen-pokemon").attr("src", `${obtenerImagenPokemon(rJSON.id)}`)
}

function mostrarStatsPokemon(rJSON) {
    $("#ataque").text(`Ataque: ${rJSON.stats[4].base_stat}`)
    $("#defensa").text(`Defensa: ${rJSON.stats[3].base_stat}`)
    $("#ataque-s").text(`Ataque S: ${rJSON.stats[2].base_stat}`)
    $("#defensa-s").text(`Defensa S: ${rJSON.stats[1].base_stat}`)
    $("#velocidad").text(`Velocidad: ${rJSON.stats[0].base_stat}`)
    $("#vitalidad").text(`Vitalidad: ${rJSON.stats[5].base_stat}`)
}

async function mostrarDescripcion(elemento) {
    const r = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${elemento.id}/`)
    const rJSON = await r.json()
    const descripcion = rJSON.flavor_text_entries.find((x) =>
        x.language.name === "es");
    $("#descripcion").text(`${descripcion.flavor_text}`)
}

async function obtenerHabilidad(elemento) {
    let array = []
    const URL = `https://pokeapi.co/api/v2/pokemon/${elemento.name}/`
    const r = await fetch(URL)
    const rJSON = await r.json()

    rJSON.abilities.forEach(elemento => {
        array.push(elemento.ability.url)
    })
    return array
}

function mostrarHabilidad(array) {
    $("#habilidad").html("")

    array.forEach(elemento => {
        $("#habilidad").append(`<p> ${elemento} </p>`)
    })
}

