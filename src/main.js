///<reference types="jquery"/>

let URL = "https://pokeapi.co/api/v2/pokemon"
let siguienteURL
let anteriorURL

mostrarListaPokemon(URL)
mostrarPokemonSeleccionado("bulbasaur")
async function mostrarListaPokemon(URL) {
    const r = await fetch(URL)
    const rJSON = await r.json()
    Object.keys(rJSON.results).forEach(pokemones => {
        numeroPokemonLista = obtenerNumeroPokemon(rJSON.results[pokemones].url)
        $("#data").append($(`<tr><td class="border px-4 py-2" data-pokemon="${rJSON.results[pokemones].name}">${rJSON.results[pokemones].name}</td><td class="border px-4 py-2">${numeroPokemonLista}</td>`))

    })
    $("tr").click(() => {
        let click = clickPokemonLista();
        mostrarPokemonSeleccionado(click);
    });
    siguienteURL = rJSON.next
    anteriorURL = rJSON.previous


}


function obtenerNumeroPokemon(elemento) {
    let numeroPokemon = elemento.substr(elemento.length - 5)
    return numeroPokemon.replace(/[^0-9]/g, '');
}

function clickPokemonLista() {
    const click = event.target
    return click.dataset.pokemon
}


$("#siguiente").click(() => {
    if (siguienteURL === null) {
        return;
    } else {
        $("#data").html("")
        mostrarListaPokemon(siguienteURL)
    }
})

$("#anterior").click(() => {
    if (anteriorURL === null) {
        return;
    } else {
        $("#data").html("")
        mostrarListaPokemon(anteriorURL)
    }
})

async function mostrarPokemonSeleccionado(pokemon) {
    const URL = (`https://pokeapi.co/api/v2/pokemon/${pokemon}/`)
    const r = await fetch(URL)
    const rJSON = await r.json()

    mostrarMiniDescripcion(rJSON.id)
    mostrarNumeroYNombrePokemon(rJSON)
    mostrarImagenPokemon(rJSON)
    mostrarStatsPokemon(rJSON)
    obtenerDescripcion(rJSON.id)
    mostrarTipo(rJSON)
    manejarHabilidades(rJSON)
    async function manejarHabilidades(rJSON) {
        const habilidades = await obtenerHabilidad(rJSON.name)
        const habilidadesEspaniol = await traducirEspaniol(habilidades)
        console.log(habilidadesEspaniol)
        mostrarHabilidad(habilidadesEspaniol)

    }


}
function mostrarTipo(rJSON) {
    debugger
    console.log(rJSON)
    $("#tipos").html("")
    rJSON.types.forEach(types => {
        $("#tipos").append(`<img src="img/Tipos/${types.type.name}.gif"/>`)
    })
}




function mostrarHabilidad(array) {
    console.log(array)
    $("#habilidad").html("")

    array.forEach(elemento => {
        console.log(elemento)
        $("#habilidad").append(`<div>${elemento}`)
    })
}




async function mostrarMiniDescripcion(id) {
    const r = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`)
    const rJSON = await r.json()
    let miniDescripcion = rJSON.genera.find((x) =>
        x.language.name === "es");
    $("#mini-descripcion").text(miniDescripcion.genus)
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

function mostrarNumeroYNombrePokemon(rJSON) {
    $("#id-pokemon").text(`Nº ${rJSON.id} ${rJSON.name}`)
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




async function obtenerDescripcion(id) {
    const r = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`)
    const rJSON = await r.json()
    const descripcion = rJSON.flavor_text_entries.find((x) =>
        x.language.name === "es");
    $("#descripcion").text(`${descripcion.flavor_text}`)
}

async function obtenerHabilidad(name) {
    let array = []
    const URL = `https://pokeapi.co/api/v2/pokemon/${name}/`
    const r = await fetch(URL)
    const rJSON = await r.json()

    rJSON.abilities.forEach(elemento => {
        array.push(elemento.ability.url)
    })
    console.log(array)


    return array
}

async function traducirEspaniol(elemento) {
    let traduccionArray = []

    for (let URL of elemento) {
        const r = await fetch(URL)
        const rJSON = await r.json()
        const temporal = rJSON.names.find((x) =>
            x.language.name === "es");
        traduccionArray.push(temporal.name)
    }
    return traduccionArray

}

$("#boton-ingresar-pokemon").click(() => {
    const pokemon = $("#ingresar-pokemon").val()
    buscarPokemon(pokemon)
})

function buscarPokemon(pokemon) {
    mostrarPokemonSeleccionado(pokemon)
}



// function obtenerTipo

// function obtenerEvoluciones



//abilities.names.find((ability) => ability.language.name === idioma);