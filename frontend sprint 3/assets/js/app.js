let cartCount = 0;
const cartBadge = document.getElementById("cart-count");

// Función para actualizar el contador
function updateCart() {
    cartBadge.textContent = cartCount;
}

// Simulación: prueba agregando un producto
function addToCart() {
    cartCount++;
    updateCart();
}

// Ejemplo: para testear con clics en botones de "Agregar"
document.querySelectorAll(".btn-add-to-cart").forEach(button => {
    button.addEventListener("click", () => {
        addToCart();
    });
});

// Simulación de inicio/cierre de sesión
let loggedIn = false; // Cambia a true si el usuario inició sesión

document.addEventListener("DOMContentLoaded", () => {
    const cerrarSesionItem = document.getElementById("logout-item");

    if (!loggedIn && cerrarSesionItem) {
    cerrarSesionItem.style.display = "none"; // Ocultar "Cerrar sesión"
    } else if (loggedIn && cerrarSesionItem) {
    cerrarSesionItem.style.display = "block"; // Mostrar si está logueado
    }
});

document.getElementById("logoutBtn").classList.remove("d-none");

document.addEventListener("DOMContentLoaded", () => {
    let current = window.location.pathname.split("/").pop();
    document.querySelectorAll(".navbar-nav .nav-link").forEach(link => {
        if(link.getAttribute("href") === current){
            link.classList.add("active");
        }
    });
});
