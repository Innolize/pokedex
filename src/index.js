import {
    obtenerDatosListaPokemon,
    mostrarListaPokemon,
} from "./ui/mostrar-lista.js";

import {
    obtenerDatosPokemonSeleccionado,
    mostrarPokemonSeleccionado,
} from "./ui/mostrar-carta.js";

let URL = "https://pokeapi.co/api/v2/pokemon"
let siguienteURL
let anteriorURL

async function actualizarPokemon(pokemon) {
    const datosPokemon = await obtenerDatosPokemonSeleccionado(pokemon)
    mostrarPokemonSeleccionado(datosPokemon)
}

async function actualizarLista(URL) {
    const nuevaLista = await obtenerDatosListaPokemon(URL)
    actualizarBotones(nuevaLista)
    mostrarListaPokemon(nuevaLista)

}


async function iniciar(URL) {
    debugger
    const lista = await obtenerDatosListaPokemon(URL)
    const pokemon = await obtenerDatosPokemonSeleccionado();
    mostrarListaPokemon(lista);
    listaClickeable();
    configurarBotones(lista);
    
    mostrarPokemonSeleccionado(pokemon)

}

iniciar(URL);

///////////////////////////////////////////
//Botones que no se si puedo dejarlos aca//
///////////////////////////////////////////




$("#boton-ingresar-pokemon").click(() => {
    const pokemon = $("#ingresar-pokemon").val()
    actualizarPokemon(pokemon.toLowerCase())
})

export function listaClickeable() {
    $("tr").click(() => {
        let pokemonClickeado = clickPokemonLista();
        actualizarPokemon(pokemonClickeado)
    });


    function clickPokemonLista() {
        const click = event.target
        return click.dataset.pokemon
    }
}

function actualizarBotones(lista) {
    siguienteURL = lista.next
    anteriorURL = lista.previous
}

export function configurarBotones(lista) {
    siguienteURL = lista.next
    anteriorURL = lista.previous

    $("#siguiente").click(() => {
        if (siguienteURL === null) {
            return;
        } else {
            $("#data").html("")
            console.log(siguienteURL)
            actualizarLista(siguienteURL)
        }
    })

    $("#anterior").click(() => {
        if (anteriorURL === null) {
            return;
        } else {
            $("#data").html("")
            actualizarLista(anteriorURL)
        }
    })

}
