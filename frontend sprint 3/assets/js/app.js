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

// ==== NAVBAR MOBILE MENU FUNCTIONALITY ====
document.addEventListener("DOMContentLoaded", () => {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    // Cerrar menú al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse.classList.contains('show')) {
                navbarToggler.click(); // Simular clic en el botón para cerrar
            }
        });
    });

    // Cerrar menú al hacer clic fuera de él
    document.addEventListener('click', (event) => {
        const navbar = document.querySelector('.navbar');
        const isClickInsideNavbar = navbar.contains(event.target);
        
        if (!isClickInsideNavbar && navbarCollapse.classList.contains('show')) {
            navbarToggler.click(); // Simular clic en el botón para cerrar
        }
    });
});

// ==== FOOTER ACCORDION FUNCTIONALITY ====
function toggleAccordion(sectionId) {
    // Solo funciona en móviles (pantallas menores a 769px)
    if (window.innerWidth <= 768) {
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
}

// Función para manejar el cambio de tamaño de ventana
function handleResize() {
    const accordionContents = document.querySelectorAll('.footer-accordion-content');
    const accordionIcons = document.querySelectorAll('.accordion-icon');
    
    if (window.innerWidth > 768) {
        // Desktop: mostrar todo el contenido
        accordionContents.forEach(content => {
            content.classList.remove('active');
        });
        accordionIcons.forEach(icon => {
            icon.classList.remove('rotated');
        });
    } else {
        // Móvil: cerrar todos por defecto
        accordionContents.forEach(content => {
            content.classList.remove('active');
        });
        accordionIcons.forEach(icon => {
            icon.classList.remove('rotated');
        });
    }
}

// Inicializar el estado de los acordeones al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    handleResize();
    
    // Escuchar cambios en el tamaño de ventana
    window.addEventListener('resize', handleResize);
});
