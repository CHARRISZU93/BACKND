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
    return fetch('/partials/history.handlebars')
        .then(respuesta => respuesta.text())
        .then(plantilla => {
            const template = Handlebars.compile(plantilla);
            const html = template({ productos })
            return html
        })
}

//

const inputUsername = document.getElementById('username')
const inputMensaje = document.getElementById('inputMessage')
const btnEnviar = document.getElementById('btnEnviar')

const formPublicarMensaje = document.getElementById('formPublicarMensaje')
formPublicarMensaje.addEventListener('submit', e => {
    e.preventDefault()

    const mensaje = { 
        autor: document.getElementById('username').value, 
        texto: document.getElementById('inputMessage').value
    }
    socket.emit('nuevoMensaje', mensaje);
    formPublicarMensaje.reset()
    inputMensaje.focus()
})

socket.on('mensajes', mensajes => {
    const html = makeHtmlList(mensajes)
    document.getElementById('mensajes').innerHTML = html;
})

function makeHtmlList(mensajes) {
    return mensajes.map(mensaje => {
        return (`
            <div>
                <b style="color:blue;">${mensaje.autor}</b>
                [<span style="color:brown;">${mensaje.fyh}</span>] :
                <i style="color:green;">${mensaje.texto}</i>
            </div>
        `)
    }).join(" ");
}

inputUsername.addEventListener('input', () => {
    const hayEmail = inputUsername.value.length
    const hayTexto = inputMensaje.value.length
    inputMensaje.disabled = !hayEmail
    btnEnviar.disabled = !hayEmail || !hayTexto
})

inputMensaje.addEventListener('input', () => {
    const hayTexto = inputMensaje.value.length
    btnEnviar.disabled = !hayTexto
}) 