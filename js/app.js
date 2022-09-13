// Cotizador para sitio de joyas artesanales

const carrito = []
const root = document.getElementById('root')
const botonAnillo = ""
const botonAros = ""
const botonCollar = ""
const botonPulsera = ""

function renderData(productos) {
    productos.forEach( p => {
        const listadoProductos = document.createElement('div')
        listadoProductos.innerHTML = 
        `<div class="p-2">
                <div class="card" style="width: 18rem;">
                    <img src="${p.imagen}" class="card-img-top" alt="${p.nombre}">
                    <div class="card-body">
                        ${p.nombre}: <strong>$${p.precio}</strong>
                        <button id="${p.id}">Agregar al carrito</button>
                    </div>
        </div>`
        root.append( listadoProductos )
    });
}
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

fetch( '/data/productos.json' )
    .then( res => res.json() )
    .then( data => {
        renderData(data)
        document.getElementById('1').addEventListener('click', clickHandler)
        document.getElementById('2').addEventListener('click', clickHandler)
        document.getElementById('3').addEventListener('click', clickHandler)
        document.getElementById('4').addEventListener('click', clickHandler)
    })

const listadoCarrito = document.createElement("div")
root.append (listadoCarrito)

let valorTotal = document.createElement("div")
root.append( valorTotal )
function clickHandler(event) {
    fetch("./data/productos.json")
    .then ((res) => res.json())
    .then ((data) => {
        let productos = data
        const productoElegido = productos.find((item) => item.id == event.target.id)
    carrito.push (productoElegido)
    var sum = carrito.reduce((acc,curr) => acc + curr.precio, 0)
    valorTotal.innerHTML = `<div class="container-fluid"><h3>Subtotal: $${sum}</h3></div>`
    const node = document.createElement("li");
    const textnode = document.createTextNode(`1x ${productoElegido.nombre}`);
    node.appendChild(textnode);
    listadoCarrito.appendChild(node)

    Toastify({
        text: "Producto agregado al carrito",
        duration: 3000,
        position: 'right',
        gravity: 'top',  
    }).showToast();

});
}

localStorage.setItem('carrito', carrito)

const vaciarCarrito = document.createElement('div')
vaciarCarrito.innerHTML = `<div><button id="vaciarCarrito">Vaciar carrito</button></div>`
root.append( vaciarCarrito )

const botonVaciarCarrito = document.getElementById('vaciarCarrito')
botonVaciarCarrito.addEventListener('click', clickHandlerVaciar)

function clickHandlerVaciar() {
    carrito.splice(0,carrito.length)
    valorTotal.innerHTML = `<div><h3>Subtotal: $0</h3></div>`
    listadoCarrito.innerHTML = ""

    Toastify({
        text: "El carrito ha sido vaciado",
        duration: 3000,
        position: 'right',
        gravity: 'top',  
    }).showToast();
}
