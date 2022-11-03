const server = io.connect()

/* -------------------------------------------------------------------------- */
/*                                  PRODUCTOS                                 */
/* -------------------------------------------------------------------------- */
server.on('product', (container) => {
    renderPdct(container)
})

function renderPdct(container){
    console.log(container)
    if (container.length > 0) {
        const html = container.map(function(e,i) {
            return(`<tr>
                    <td class="pb-2" id="title">${e.title}</td>
                    <td class="pb-2 " id="price">$${e.price}</td>
                    <td class="pb-2 d-flex justify-content-center">
                        <img style="width: 50px" id="thumbnail" src="${e.thumbnail}"/>
                    </td>
                    </tr>`)
        }).join(" ");

        document.getElementById('products').innerHTML = html;
    }else {
        const html = (`<h1>No hay productos</h1>`)
        document.getElementById('table').innerHTML = html;
    }
}
server.on('product', function(data) {renderPdct(data)})

async function addProduct(e) {
    const product = {
        title: await document.getElementById('title-form').value,
        price: await document.getElementById('price-form').value,
        thumbnail: await document.getElementById('thumbnail-form').value
    };
    server.emit('new-product', product);
}

/* -------------------------------------------------------------------------- */
/*                                  MENSAJES                                  */
/* -------------------------------------------------------------------------- */
server.on('message', (messages) => {
    renderMsj(messages)
});

function addMessage(e) {
    
    const mensaje = {
        author: {
            id: document.getElementById('id').value,
            nombre: document.getElementById('nombre').value,
            apellido:  document.getElementById('apellido').value,
            edad: document.getElementById('edad').value,
            alias: document.getElementById('alias').value,
            avatar: document.getElementById('avatar').value
        },
        text:  document.getElementById('text').value
    };
    console.log(mensaje)
    server.emit('new-message', mensaje);
    return false
}

function renderMsj(messages){
    const html = messages.map((e,i) => {
        return(`<div class="d-flex align-items-center">
        <strong class="me-1 color-primary mb-0">${e.author.id}</strong>
        <div>
        [<span class="me-0 color-secondary mb-1">${e.fyh}</span>] :
        </div>
        <span class="me-1 color-tertiary mx-2">${e.text}</span>
        <span class="me-1 color-tertiary mx-2">
        <img style="width: 30px" id="thumbnail" src="${e.author.avatar}"/>
        </span>
        </div>`)
    }).join(" ");

    document.getElementById('messages').innerHTML = html;
}
server.on('messages', function(data) { render(data); });

