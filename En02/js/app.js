    let productos = [
    {nombre: "Lechuga", precio: 1000},
    {nombre: "Tomate", precio: 1200},
    {nombre: "Frutilla", precio: 900}
    ];
    let carrito = [];

    // Render catálogo
    function renderCatalogo() {
    let cont = document.getElementById("catalogo");
    cont.innerHTML = "";
    productos.forEach((p, i) => {
        cont.innerHTML += `
        <div class="col-12 col-md-4">
            <div class="card p-3">
            <h5>${p.nombre}</h5>
            <p>$${p.precio}</p>
            <button class="btn btn-success" onclick="agregarCarrito(${i})">+</button>
            </div>
        </div>`;
    });
    }

    function agregarCarrito(i) {
    carrito.push(productos[i]);
    alert(`${productos[i].nombre} añadido al carrito`);
    }

    // Render carrito
    function renderCarrito() {
    let cont = document.getElementById("carrito");
    if (!cont) return;
    cont.innerHTML = carrito.map((p, i) => `
        <div class="d-flex justify-content-between align-items-center border p-2">
        <span>${p.nombre} - $${p.precio}</span>
        <button class="btn btn-danger btn-sm" onclick="eliminarCarrito(${i})">Eliminar</button>
        </div>
    `).join("");
    }

    function eliminarCarrito(i) {
    carrito.splice(i, 1);
    renderCarrito();
    }

    // Admin
    function renderAdmin() {
    let cont = document.getElementById("adminProductos");
    if (!cont) return;
    cont.innerHTML = productos.map((p, i) => `
        <div class="border p-3 mb-2">
        <h5>${p.nombre}</h5>
        <input type="number" class="form-control my-2" value="${p.precio}" onchange="editarPrecio(${i}, this.value)">
        <button class="btn btn-danger" onclick="borrarProducto(${i})">Borrar</button>
        </div>
    `).join("");
    }

    function borrarProducto(i) {
    productos.splice(i, 1);
    renderAdmin();
    }

    function crearProducto() {
    productos.push({nombre: "Nuevo", precio: 0});
    renderAdmin();
    }

// Checkout simulado
    function procesarPago(e) {
    e.preventDefault();
    alert("✅ Pago procesado (simulado). Gracias por tu compra!");
    carrito = [];
    }   
