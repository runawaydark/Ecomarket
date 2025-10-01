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

// ==== FOOTER ACCORDION FUNCTIONALITY ====
function toggleAccordion(sectionId) {
    const content = document.getElementById(sectionId + '-content');
    const icon = document.getElementById(sectionId + '-icon');
    
    if (content.classList.contains('active')) {
        // Cerrar el acordeón
        content.classList.remove('active');
        icon.classList.remove('rotated');
    } else {
        // Abrir el acordeón
        content.classList.add('active');
        icon.classList.add('rotated');
    }
}

// Inicializar el estado de los acordeones al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    // Por defecto, todos los acordeones están cerrados
    const accordionContents = document.querySelectorAll('.footer-accordion-content');
    accordionContents.forEach(content => {
        content.classList.remove('active');
    });
    
    // Por defecto, todos los íconos apuntan hacia abajo
    const accordionIcons = document.querySelectorAll('.accordion-icon');
    accordionIcons.forEach(icon => {
        icon.classList.remove('rotated');
    });
});
