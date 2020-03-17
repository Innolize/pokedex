import {
    mostrarListaPokemon,
    configurarBotones,
} from "./ui/mostrar-lista.js";

import {
    mostrarPokemonSeleccionado,
    listaClickeable,
} from "./ui/mostrar-carta.js";

let URL = "https://pokeapi.co/api/v2/pokemon"


async function iniciar() {
    mostrarListaPokemon(URL);
    configurarBotones();
    await mostrarPokemonSeleccionado("bulbasaur");
    listaClickeable();
}

iniciar();

$("#boton-ingresar-pokemon").click(() => {
    const pokemon = $("#ingresar-pokemon").val()
    mostrarPokemonSeleccionado(pokemon.toLowerCase())
})
