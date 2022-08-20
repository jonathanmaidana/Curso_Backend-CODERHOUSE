const server = io().connect();

// server.on('message', data => {
//     console.log('message', data);
// })

server.on('message', (messages) => {
    render(messages)
});

function render(messages){
    console.log(messages)
    const html = messages.map(function (e,i) {
        return(`<div>
        <strong>${e.author}</strong>
        <>${e.text}</>
        </div>`)
    }).join(" ");

    document.getElementById('messages').innerHTML = html;
}
server.on('message', function(data) {render(data)})

function addMessage(e) {
    const mensaje = {
        author: document.getElementById('username').value,
        text: document.getElementById('texto').value
    };
    server.emit('new-message', mensaje);
    return false;
}

server.on('container', (container) => {
    render(container)
})

function render(container){
    console.log(container)
    const html = container.map(function(e,i) {
        return(`<tr>
                <td class="pb-2" id="title">${e.title}</td>
                <td class="pb-2" id="price">${e.price}</td>
                <td class="pb-2 d-flex justify-content-center">
                    <img style="width: 30px" id="thumbnail" src=${e.thumbnail}/>
                </td>
                </tr>`)
    }).join(" ");

    document.getElementById('products').innerHTML = html;
}
server.on('container', function(data) {render(data)})

function addProduct(e) {
    const product = {
        title: document.getElementById('title-form').value,
        price: document.getElementById('price-form').value,
        thumbnail: document.getElementById('thumbnail-form').value
    };
    server.emit('new-product', product);
    return false;
}
