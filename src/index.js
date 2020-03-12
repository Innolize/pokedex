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
    const baka = await mostrarListaPokemon(URL);
    const baka2 = await configurarBotones();
    await mostrarPokemonSeleccionado("bulbasaur");
    listaClickeable();
}

iniciar();

$("#boton-ingresar-pokemon").click(() => {
    const pokemon = $("#ingresar-pokemon").val()
    mostrarPokemonSeleccionado(pokemon.toLowerCase())
})
