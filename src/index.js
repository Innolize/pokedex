import {
    mostrarListaPokemon,
} from "./ui/mostrar-lista.js";

import {
    mostrarPokemonSeleccionado,
} from "./ui/mostrar-carta.js";

import {
    obtenerDatosListaPokemonAPI,
    obtenerDatosPokemonAPI,
} from "./service/pokemonAPI.js"

import {
    configurarBotonesLista,
    botonesClickeables,
    listaClickeable,
} from "./ui/interaccion-usuario.js"

async function actualizarLista(url) {
    const datosLista = await obtenerDatosListaPokemonAPI(url)
    mostrarListaPokemon(await datosLista)
    configurarBotonesLista(await datosLista)
    listaClickeable(actualizarPokemon)
}

async function actualizarPokemon(pokemon) {
    mostrarPokemonSeleccionado(await obtenerDatosPokemonAPI(pokemon))
}

async function iniciarPokedex() {
    const datosLista = await obtenerDatosListaPokemonAPI()
    mostrarListaPokemon(datosLista)
    listaClickeable(actualizarPokemon)
    mostrarPokemonSeleccionado(await obtenerDatosPokemonAPI())
    configurarBotonesLista(datosLista)
    botonesClickeables(actualizarLista)

}

iniciarPokedex();

///////////////////////////////////////////
//Botones que no se si puedo dejarlos aca//
///////////////////////////////////////////

$("#boton-ingresar-pokemon").click(() => {
    const pokemon = $("#ingresar-pokemon").val()
    actualizarPokemon(pokemon.toLowerCase())
})


