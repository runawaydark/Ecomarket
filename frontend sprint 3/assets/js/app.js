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

// ==== FOOTER LOADER FUNCTIONALITY ====
// HTML del footer almacenado directamente en JavaScript para evitar problemas con fetch() en archivos locales
function getFooterHTML() {
    return `<footer class="footer">
    <div class="footer-top">
        <p>¿Te queda alguna duda? Capaz que esta información te sirva ;)</p>
    </div>
    <div class="footer-content">
        <div class="footer-section">
            <h4 class="footer-accordion-header" onclick="toggleAccordion('pasillos')">
                PASILLOS <i class="bi bi-chevron-down accordion-icon" id="pasillos-icon"></i>
            </h4>
            <ul class="footer-accordion-content" id="pasillos-content">
                <li><a href="#">Frutas</a></li>
                <li><a href="#">Verduras</a></li>
                <li><a href="#">Despensa</a></li>
                <li><a href="#">Ofertas</a></li>
            </ul>
        </div>

        <div class="footer-section">
            <h4 class="footer-accordion-header" onclick="toggleAccordion('paginas')">
                PÁGINAS <i class="bi bi-chevron-down accordion-icon" id="paginas-icon"></i>
            </h4>
            <ul class="footer-accordion-content" id="paginas-content">
                <li><a href="#">Nosotros</a></li>
                <li><a href="#">Catálogo</a></li>
                <li><a href="#">Contacto</a></li>
                <li><a href="#">Blog</a></li>
            </ul>
        </div>

        <div class="footer-section">
            <h4 class="footer-accordion-header" onclick="toggleAccordion('contacto')">
                CONTACTO <i class="bi bi-chevron-down accordion-icon" id="contacto-icon"></i>
            </h4>
            <ul class="footer-accordion-content" id="contacto-content">
                <li><a href="#">WhatsApp</a></li>
                <li><a href="#">Correo</a></li>
                <li><a href="#">Instagram</a></li>
            </ul>
        </div>

        <div class="footer-section">
            <h4 class="footer-accordion-header" onclick="toggleAccordion('politicas')">
                POLÍTICAS <i class="bi bi-chevron-down accordion-icon" id="politicas-icon"></i>
            </h4>
            <ul class="footer-accordion-content" id="politicas-content">
                <li><a href="#">Términos de servicio</a></li>
                <li><a href="#">Política de privacidad</a></li>
                <li><a href="#">Política de devoluciones</a></li>
            </ul>
        </div>
    </div>

    <div class="footer-bottom">
        <p>© 2025, EcoMarket | Todos los derechos reservados</p>
    </div>
</footer>`;
}

function loadFooter() {
    console.log('=== INICIANDO CARGA DEL FOOTER ===');
    
    // Buscar el contenedor donde se debe cargar el footer
    const footerContainer = document.getElementById('footer-container');
    
    if (footerContainer) {
        console.log('✅ Contenedor #footer-container encontrado');
        console.log('🔄 Insertando HTML del footer...');
        
        try {
            footerContainer.innerHTML = getFooterHTML();
            console.log('✅ HTML insertado correctamente');
            
            // Verificar que se insertó
            const footer = footerContainer.querySelector('footer');
            if (footer) {
                console.log('✅ Footer element creado exitosamente');
                // Después de cargar el footer, inicializar los acordeones
                handleResize();
                console.log('✅ Footer cargado y configurado completamente');
            } else {
                console.error('❌ Error: Footer element no encontrado después de insertar HTML');
            }
        } catch (error) {
            console.error('❌ Error al insertar HTML del footer:', error);
        }
    } else {
        console.error('❌ No se encontró el contenedor #footer-container');
        console.log('🔍 Contenedores disponibles:', Array.from(document.querySelectorAll('[id]')).map(el => el.id));
    }
}

// Inicializar el estado de los acordeones al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    console.log('🚀 DOM Content Loaded - Iniciando app.js');
    
    // Cargar el footer si existe un contenedor para él
    loadFooter();
    
    // Inicializar acordeones
    handleResize();
    
    // Escuchar cambios en el tamaño de ventana
    window.addEventListener('resize', handleResize);
    
    console.log('✅ Inicialización completa');
});


document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const togglePassword = document.getElementById("togglePassword");
  const passwordInput = document.getElementById("password");

  // Mostrar/ocultar contraseña
  togglePassword.addEventListener("click", () => {
    const type = passwordInput.type === "password" ? "text" : "password";
    passwordInput.type = type;
    togglePassword.innerHTML = type === "password" 
      ? '<i class="bi bi-eye"></i>' 
      : '<i class="bi bi-eye-slash"></i>';
  });

  // Validaciones
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!loginForm.checkValidity()) {
      e.stopPropagation();
      loginForm.classList.add("was-validated");
      return;
    }

    const name = document.getElementById("name").value;
    alert(`Hola ${name}, has iniciado sesión correctamente (ejemplo frontend)`);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const pwd = document.getElementById("password");
  const toggleBtn = document.querySelector(".password-toggle");
  const icon = toggleBtn ? toggleBtn.querySelector("i") : null;

  if (toggleBtn && pwd && icon) {
    const setMode = (show) => {
      pwd.type = show ? "text" : "password";
      toggleBtn.setAttribute("aria-pressed", String(show));
      icon.classList.toggle("bi-eye", !show);
      icon.classList.toggle("bi-eye-slash", show);

      // Mantener el cursor al final (algunos navegadores lo mueven)
      const v = pwd.value;
      pwd.value = "";
      pwd.value = v;
      pwd.focus({ preventScroll: true });
    };

    toggleBtn.addEventListener("click", () => {
      setMode(pwd.type === "password");
    });
  }
});
