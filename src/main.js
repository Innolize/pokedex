///<reference types="jquery"/>

let URL = "https://pokeapi.co/api/v2/pokemon"


mostrarListaPokemon(URL)
function mostrarListaPokemon(URL) {
    fetch(URL)
        .then(respuesta => respuesta.json())
        .then(respuestaJSON => {
            Object.keys(respuestaJSON.results).forEach(pokemones => {
                $("#pokemones").append($(`<li class="lista-pokemones">#${pokemones}: ${respuestaJSON.results[pokemones].name}</li>`))


            })
            $("li").click(() => {
                mostrarPokemonSeleccionado();
                console.log("click");
            });
            siguienteURL = respuestaJSON.next
            anteriorURL = respuestaJSON.previous

        })
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

mostrarPokemonSeleccionado();
function mostrarPokemonSeleccionado() {
    fetch(`https://pokeapi.co/api/v2/pokemon/bulbasaur/`)
        .then(respuesta => respuesta.json())
        .then(respuestaJSON => {
            respuestaJSON.abilities.forEach(elemento => {
                $("#habilidad").append(`<div>${elemento.ability.name}`)
            })
            $("#id-pokemon").text(`Nº ${respuestaJSON.id} ${respuestaJSON.name}`)
            $("#tipo").text("tipo")
            $("#ataque").text(`Velocidad: ${respuestaJSON.stats[4].base_stat}`)
            $("#defensa").text(`Defensa: ${respuestaJSON.stats[3].base_stat}`)
            $("#ataque-s").text(`Ataque S: ${respuestaJSON.stats[2].base_stat}`)
            $("#defensa-s").text(`Defensa S: ${respuestaJSON.stats[1].base_stat}`)
            $("#velocidad").text(`Velocidad: ${respuestaJSON.stats[0].base_stat}`)
            $("#vitalidad").text(`Vitalidad: ${respuestaJSON.stats[5].base_stat}`)
            $("#imagen-pokemon").attr("src", `${obtenerImagenPokemon(respuestaJSON.id)}`)
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


function obtenerDescripcion(id) {
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`)
        .then(respuesta => respuesta.json())
        .then(respuestaJSON => {
            const descripcion = respuestaJSON.flavor_text_entries.find((x) =>
                x.language.name === "es");
            $("#descripcion").text(`${descripcion.flavor_text}`)
        })

}

function obtenerHabilidad(name) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`)
        .then(respuesta => respuesta.json())
        .then(respuestaJSON => {
            debugger
            console.log(respuestaJSON.abilities)
            let array = []
            respuestaJSON.abilities.forEach(elemento => {
                console.log(elemento.ability.url)
                array.push(elemento.ability.url)
            })
            array.forEach(elemento => {
                traducirEspaniol(elemento)
            })
            console.log(abilitiesArray)
        })
}


function traducirEspaniol(elemento) {
    fetch(elemento)
        .then(respuesta => respuesta.json())
        .then(respuestaJSON => {
            const temporal = respuestaJSON.flavor_text_entries.find((x) =>
                x.language.name === "es");
            return temporal.flavor_text
        })
}
// function obtenerTipo

// function obtenerEvoluciones



//abilities.names.find((ability) => ability.language.name === idioma);