///<reference types="jquery"/>

let URL = "https://pokeapi.co/api/v2/pokemon"


mostrarListaPokemon(URL)
mostrarPokemonSeleccionado("bulbasaur")
async function mostrarListaPokemon(URL) {
    await fetch(URL)
        .then(respuesta => respuesta.json())
        .then(respuestaJSON => {
            Object.keys(respuestaJSON.results).forEach(pokemones => {
                $("#pokemones").append($(`<li class="lista-pokemones" data-pokemon="${respuestaJSON.results[pokemones].name}">${respuestaJSON.results[pokemones].name}</li>`))


            })
            $("li").click(() => {
                let click = clickEnPokemon();
                mostrarPokemonSeleccionado(click);
            });
            siguienteURL = respuestaJSON.next
            anteriorURL = respuestaJSON.previous

        })
}


function clickEnPokemon(){
    const click = event.target
    console.log(click.dataset.pokemon)
    return click.dataset.pokemon
}




let siguienteURL
let anteriorURL

$("#siguiente").click(() => {
    if (siguienteURL === null) {
        return;
    } else {
        $("#pokemones").html("")
        mostrarListaPokemon(siguienteURL)
    }
})

$("#anterior").click(() => {
    if (anteriorURL === null) {
        return;
    } else {
        $("#pokemones").html("")
        mostrarListaPokemon(anteriorURL)
    }
})

async function mostrarPokemonSeleccionado(pokemon) {
    await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`)
        .then(respuesta => respuesta.json())
        .then(respuestaJSON => {
            respuestaJSON.abilities.forEach(elemento => {
                $("#habilidad").append(`<div>${elemento.ability.name}`)
            })
            
            
            mostrarNumeroYNombrePokemon(respuestaJSON)
            mostrarImagenPokemon(respuestaJSON)
            mostrarStatsPokemon (respuestaJSON)
            obtenerDescripcion(respuestaJSON.id)
            obtenerHabilidad(respuestaJSON.name)
        })
}

function obtenerImagenPokemon(id) {
    const URLFoto = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${agregarCeros(id, 3)}.png`
    return URLFoto;
}

function agregarCeros(numero, longitud) {
    let string = "" + numero;
    while (string.length < longitud) {
        string = "0" + string;
    }
    return string
}

function mostrarNumeroYNombrePokemon(respuestaJSON){
$("#id-pokemon").text(`Nº ${respuestaJSON.id} ${respuestaJSON.name}`)
}

function mostrarImagenPokemon(respuestaJSON){
    $("#imagen-pokemon").attr("src", `${obtenerImagenPokemon(respuestaJSON.id)}`)
}

function mostrarStatsPokemon (respuestaJSON){
    $("#ataque").text(`Velocidad: ${respuestaJSON.stats[4].base_stat}`)
    $("#defensa").text(`Defensa: ${respuestaJSON.stats[3].base_stat}`)
    $("#ataque-s").text(`Ataque S: ${respuestaJSON.stats[2].base_stat}`)
    $("#defensa-s").text(`Defensa S: ${respuestaJSON.stats[1].base_stat}`)
    $("#velocidad").text(`Velocidad: ${respuestaJSON.stats[0].base_stat}`)
    $("#vitalidad").text(`Vitalidad: ${respuestaJSON.stats[5].base_stat}`)
}

async function obtenerDescripcion(id) {
    await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`)
        .then(respuesta => respuesta.json())
        .then(respuestaJSON => {
            const descripcion = respuestaJSON.flavor_text_entries.find((x) =>
                x.language.name === "es");
            $("#descripcion").text(`${descripcion.flavor_text}`)
        })

}

async function obtenerHabilidad(name) {
    await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`)
        .then(respuesta => respuesta.json())
        .then(respuestaJSON => {
            console.log(respuestaJSON.abilities)
            let array = []
            respuestaJSON.abilities.forEach(elemento => {
                console.log(elemento.ability.url)
                array.push(elemento.ability.url)
            })
            array.forEach(elemento => {
                traducirEspaniol(elemento)
            })
        })
}


// async function traducirEspaniol(elemento) {
//     await fetch(elemento)
//         .then(respuesta => respuesta.json())
//         .then(respuestaJSON => {
//             console.log(respuestaJSON)
//             debugger
//             const temporal = respuestaJSON.find((x) =>
//                 x.language.name === "es");
//             console.log(temporal)
//         })
// }
// function obtenerTipo

// function obtenerEvoluciones



//abilities.names.find((ability) => ability.language.name === idioma);