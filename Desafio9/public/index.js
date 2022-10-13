const server = io().connect();

server.on('message', (messages) => {
    renderMsj(messages)
});

function renderMsj(messages){
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();


/* A function that takes the messages from the server and renders them in the HTML. */
    const html = messages.map(function (e,i) {
        console.log(messages);
        return(`<div class="d-flex align-items-center">
        <strong class="me-1 color-primary mb-1">${e.id}</strong>
        <div>
        <span class="me-1 color-secondary mb-1">[${day}/${month}/${year} ${hour}:${minute}:${second}]:</span>
        </div>
        <span class="me-1 color-tertiary mb-1">${e.text}</span>
        <span class="me-1 color-tertiary mb-1">
        <img style="width: 30px" id="thumbnail" src="${e.avatar}"/>
        </span>
        </div>`)
    }).join(" ");

    document.getElementById('messages').innerHTML = html;
}
server.on('message', function(data) {renderMsj(data)})



async function addMessage(e) {
    const mensaje = {
        id: await document.getElementById('id').value,
        nombre: await document.getElementById('nombre').value,
        apellido: await document.getElementById('apellido').value,
        edad: await document.getElementById('edad').value,
        alias: await document.getElementById('alias').value,
        avatar: await document.getElementById('avatar').value,
        text: await document.getElementById('text').value
    };
    console.log(mensaje)
    server.emit('new-message', mensaje);
    return false;
}

/* Listening for a new product to be added to the database. */
server.on('product', (container) => {
    renderPdct(container)
})


/* Rendering the products in the table. */
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

/**
 * It takes the values from the form and sends them to the server.
 * @param e - the event object
 * @returns false.
 */
async function addProduct(e) {
    const product = {
        title: await document.getElementById('title-form').value,
        price: await document.getElementById('price-form').value,
        thumbnail: await document.getElementById('thumbnail-form').value
    };
    server.emit('new-product', product);
    return false;
}