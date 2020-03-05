///<reference types="jquery"/>

//pokemon lista

fetch("https://pokeapi.co/api/v2/pokemon")
    .then(respuesta => respuesta.json())
    .then(respuestaJSON => {
        console.log(respuestaJSON)

        Object.keys(respuestaJSON.results).forEach(pokemones => {
            $("#pokemones").append($(`<li class="lista-pokemones">#${pokemones}: ${respuestaJSON.results[pokemones].name}</li>`))


        })
        $("li").click(() => {
            console.log("click");
        });
    })
