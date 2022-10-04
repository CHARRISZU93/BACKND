const socket = io.connect()

const info = document.getElementById('formulario')

info.addEventListener('submit', (event) => {
    event.preventDefault()
    const producto = {
        name: document.getElementById('name').value,
        price: document.getElementById('price').value,
    }
    socket.emit('productos', producto)
    info.reset()
})

socket.on('server-productos', (productos) => {
    tablaHtml(productos).then(html => {
        document.getElementById('productos').innerHTML = html
    })
})

function tablaHtml(productos) {
    return fetch('history.handlebars')
        .then(respuesta => respuesta.text())
        .then(plantilla => {
            const template = Handlebars.compile(plantilla);
            const html = template({ productos })
            return html
        })
}