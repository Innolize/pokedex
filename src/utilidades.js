export function agregarCeros(numero, longitud) {
    let string = "" + numero;
    while (string.length < longitud) {
        string = "0" + string;
    }
    return string
}

export function primerLetraMayus(palabra) {
    return palabra.charAt(0).toUpperCase() + palabra.slice(1);
}

export async function traducirEspaniol(elemento) {
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