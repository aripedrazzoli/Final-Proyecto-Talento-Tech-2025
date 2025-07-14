document.addEventListener('DOMContentLoaded', () => {
    let productosDisponibles = [];

    fetch('productos.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar los productos');
            }
            return response.json();
        })
        .then(data => {
            productosDisponibles = data;
            renderizarProductos();
        })
        .catch(error => {
            console.error('Error al obtener los productos:', error);
        });

    function renderizarProductos() {
        const productContainer = document.getElementById('contenedorListaProductos');

        const cardsHtml = productosDisponibles.map(producto => {
            //alert(producto.name)
            return `
                <div class="product-card">
                    <img src="${producto.image}" alt="${producto.name}">
                    <h3>${producto.name}</h3>
                    <p>${producto.description}</p>
                    <div class="price">$ ${producto.price}</div>
                    <button class="btn-agregar-carrito" id="btn-agregar-${producto.id}">Agregar al Carrito</button>
                </div>
            `;
        });

        productContainer.innerHTML = cardsHtml.join('');
        adjuntarEventosAgregarCarrito();
    }

    function adjuntarEventosAgregarCarrito() {
        productosDisponibles.forEach(producto => {
            const boton = document.getElementById(`btn-agregar-${producto.id}`);
            if (boton) {
                boton.addEventListener('click', () => {
                    agregarProductoAlCarrito(producto);
                });
            }
        });
    }

    function agregarProductoAlCarrito(productoAAgregar) {
        let carrito = JSON.parse(localStorage.getItem('carritoDeCompras')) || [];

        const indiceProductoExistente = carrito.findIndex(item => item.id === productoAAgregar.id);

        if (indiceProductoExistente !== -1) {
            carrito[indiceProductoExistente].cantidad++;
        } else {
            carrito.push({
                id: productoAAgregar.id,
                name: productoAAgregar.name,
                price: productoAAgregar.price,
                cantidad: 1
            });
        }

        localStorage.setItem('carritoDeCompras', JSON.stringify(carrito));
        alert(`${productoAAgregar.name} agregado al carrito!`);
    }
});
