let siguienteURL
let anteriorURL

export function configurarBotonesLista(rJSON) {
    siguienteURL = rJSON.next
    anteriorURL = rJSON.previous
}

export function botonesClickeables(funcion) {
    $("#siguiente").click(() => {
        if (siguienteURL === null) {
            return;
        } else {
            $("#data").html("")
            funcion(siguienteURL)
        }
    })

    $("#anterior").click(() => {
        if (anteriorURL === null) {
            return;
        } else {
            $("#data").html("")
            funcion(anteriorURL)
        }
    })
}

export function listaClickeable(funcion) {
    debugger
    $("td").click(() => {
        let click = clickPokemonLista();
        funcion(click);
    });
}
function clickPokemonLista() {
    const click = event.target
    return click.dataset.pokemon
}