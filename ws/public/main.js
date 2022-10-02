const socket = io.connect()

const info = document.getElementById('formulario')

info.addEventListener('submit', (event) => {
    e.preventDefault()
    const producto = {
        name: info[0].value,
        price: info[1].value,
    }
    socket.emit('productos', producto)
    info.reset()
})

socket.on('productosprecio', (productos) => {
    tablaHtml(productos).then(html => {
        document.getElementById('productos').innerHTML = html
    })
}
)

function tablaHtml(productos) {
    return fetch('partials/form.handlebars')
        .then(respuesta => respuesta.text())
        .then(plantilla => {
            const template = Handlebars.compile(plantilla);
            const html = template({ productos })
            return html
        })
}

