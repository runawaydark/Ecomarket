// ===== SISTEMA DE CARRITO GLOBAL =====
// Función para actualizar el contador del carrito en todas las páginas
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('ecomarket_cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartBadge = document.getElementById('cart-count');
    if (cartBadge) {
        cartBadge.textContent = totalItems;
        cartBadge.style.display = totalItems > 0 ? 'inline-block' : 'none';
    }
}

// Escuchar eventos de actualización del carrito
window.addEventListener('cartUpdated', function(event) {
    updateCartCount();
});

// Inicializar contador al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
});

// Sistema de autenticación
function checkAuthStatus() {
    const isLoggedIn = localStorage.getItem('ecomarket_logged_in') === 'true';
    const userType = localStorage.getItem('ecomarket_user_type');
    const userEmail = localStorage.getItem('ecomarket_user_email');
    
    return {
        isLoggedIn,
        userType,
        userEmail,
        isAdmin: userType === 'admin'
    };
}

// Función para cerrar sesión
function logout() {
    if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
        localStorage.removeItem('ecomarket_logged_in');
        localStorage.removeItem('ecomarket_user_type');
        localStorage.removeItem('ecomarket_user_email');
        localStorage.removeItem('ecomarket_user_name');
        
        alert('Sesión cerrada correctamente');
        window.location.href = 'index.html';
    }
}

// Actualizar navbar según estado de autenticación
function updateNavbar() {
    const auth = checkAuthStatus();
    const navbar = document.querySelector('.navbar-nav');
    
    // Para páginas con navbar tradicional (como catálogo)
    if (navbar) {
        // Buscar si ya existe el enlace de admin
        let adminLink = navbar.querySelector('.admin-nav-item');
        let loginLink = document.querySelector('a[href="login.html"]');
        
        if (auth.isLoggedIn && auth.isAdmin) {
            // Usuario admin logueado - mostrar enlace de admin
            if (!adminLink) {
                const adminItem = document.createElement('li');
                adminItem.className = 'nav-item admin-nav-item';
                adminItem.innerHTML = `
                    <a class="nav-link" href="admin.html">
                        <i class="bi bi-gear-fill"></i> Admin
                    </a>
                `;
                navbar.appendChild(adminItem);
            }
            
            // Cambiar enlace de login por logout
            if (loginLink) {
                loginLink.innerHTML = '<i class="bi bi-box-arrow-right"></i>';
                loginLink.href = '#';
                loginLink.title = 'Cerrar sesión';
                loginLink.onclick = (e) => {
                    e.preventDefault();
                    logout();
                };
            }
        } else if (auth.isLoggedIn) {
            // Usuario normal logueado - solo mostrar logout
            if (adminLink) {
                adminLink.remove();
            }
            
            if (loginLink) {
                loginLink.innerHTML = '<i class="bi bi-box-arrow-right"></i>';
                loginLink.href = '#';
                loginLink.title = 'Cerrar sesión';
                loginLink.onclick = (e) => {
                    e.preventDefault();
                    logout();
                };
            }
        } else {
            // Usuario no logueado - remover admin link y mostrar login normal
            if (adminLink) {
                adminLink.remove();
            }
            
            if (loginLink) {
                loginLink.innerHTML = '<i class="bi bi-person fs-5"></i>';
                loginLink.href = 'login.html';
                loginLink.title = 'Iniciar sesión';
                loginLink.onclick = null;
            }
        }
    }
    
    // Para páginas con dropdown (como index)
    updateUserDropdown();
}

// Actualizar dropdown del usuario
function updateUserDropdown() {
    const auth = checkAuthStatus();
    const dropdownMenu = document.getElementById('userDropdownMenu');
    
    if (!dropdownMenu) return;
    
    if (auth.isLoggedIn) {
        const userName = localStorage.getItem('ecomarket_user_name') || auth.userEmail;
        const displayName = auth.isAdmin ? 'Administrador' : userName;
        
        dropdownMenu.innerHTML = `
            <li><span class="dropdown-item-text"><strong>${displayName}</strong></span></li>
            <li><hr class="dropdown-divider"></li>
            ${auth.isAdmin ? '<li><a class="dropdown-item" href="admin.html"><i class="bi bi-gear-fill me-2"></i>Panel Admin</a></li>' : ''}
            <li><a class="dropdown-item" href="pedidos.html"><i class="bi bi-bag me-2"></i>Mis pedidos</a></li>
            <li><a class="dropdown-item" href="carrito.html"><i class="bi bi-cart me-2"></i>Ver carrito</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#" onclick="logout()"><i class="bi bi-box-arrow-right me-2"></i>Cerrar sesión</a></li>
        `;
    } else {
        dropdownMenu.innerHTML = `
            <li><a class="dropdown-item" href="login.html"><i class="bi bi-box-arrow-in-right me-2"></i>Iniciar sesión</a></li>
            <li><a class="dropdown-item" href="login.html"><i class="bi bi-person-plus me-2"></i>Registrarse</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="carrito.html"><i class="bi bi-cart me-2"></i>Ver carrito</a></li>
        `;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    updateNavbar();
    
    // Verificar si estamos en una página que requiere autenticación
    const currentPage = window.location.pathname.split('/').pop();
    const auth = checkAuthStatus();
    
    if (currentPage === 'admin.html' && (!auth.isLoggedIn || !auth.isAdmin)) {
        alert('Acceso denegado. Debes iniciar sesión como administrador.');
        window.location.href = 'login.html';
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
