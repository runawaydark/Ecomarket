// ===== SISTEMA DE PRODUCTOS PARA CATÁLOGO =====

// Productos por defecto
const defaultProducts = [
    {
        id: 'frutillas',
        name: 'Frutillas Frescas Premium',
        category: 'frutas',
        description: 'Frutillas de temporada, dulces y jugosas. Perfectas para postres y desayunos saludables.',
        price: 1600,
        originalPrice: 2000,
        unit: 'kg',
        stock: 15,
        maxStock: 20,
        image: 'assets/img/frutillas.jpg',
        rating: 4.5,
        reviews: 24,
        isNew: false,
        isOffer: true,
        available: true
    },
    {
        id: 'lechuga',
        name: 'Lechuga Criolla Fresca',
        category: 'verduras',
        description: 'Lechuga criolla de hoja verde, crujiente y fresca. Ideal para ensaladas y hamburguesas.',
        price: 1200,
        originalPrice: null,
        unit: 'unidad',
        stock: 25,
        maxStock: 30,
        image: 'assets/img/lechuga.jpg',
        rating: 4.0,
        reviews: 18,
        isNew: false,
        isOffer: false,
        available: true
    },
    {
        id: 'tomates',
        name: 'Tomates Cherry Orgánicos',
        category: 'verduras',
        description: 'Tomates cherry orgánicos, dulces y jugosos. Perfectos para ensaladas y snacks saludables.',
        price: 2800,
        originalPrice: null,
        unit: 'kg',
        stock: 3,
        maxStock: 20,
        image: 'assets/img/tomates.jpg',
        rating: 5.0,
        reviews: 32,
        isNew: false,
        isOffer: false,
        available: true
    },
    {
        id: 'zanahorias',
        name: 'Zanahorias Baby Premium',
        category: 'verduras',
        description: 'Zanahorias baby tiernas y dulces. Ideales para cocinar o consumir crudas como snack saludable.',
        price: 1800,
        originalPrice: null,
        unit: 'kg',
        stock: 20,
        maxStock: 25,
        image: 'assets/img/zanahoria.jpg',
        rating: 4.2,
        reviews: 12,
        isNew: true,
        isOffer: false,
        available: true
    },
    {
        id: 'manzanas',
        name: 'Manzanas Red Delicious',
        category: 'frutas',
        description: 'Manzanas rojas crujientes y dulces. Perfectas para consumir frescas o en postres.',
        price: 2200,
        originalPrice: null,
        unit: 'kg',
        stock: 30,
        maxStock: 40,
        image: 'assets/img/manzanas.png',
        rating: 4.3,
        reviews: 28,
        isNew: false,
        isOffer: false,
        available: true
    },
    {
        id: 'bananas',
        name: 'Bananas Premium',
        category: 'frutas',
        description: 'Bananas maduras y dulces, ricas en potasio. Ideales para batidos y desayunos.',
        price: 1500,
        originalPrice: 1800,
        unit: 'kg',
        stock: 18,
        maxStock: 25,
        image: 'assets/img/bananas.png',
        rating: 4.6,
        reviews: 45,
        isNew: false,
        isOffer: true,
        available: true
    }
];

// Variables globales para paginación y filtros
let currentPage = 1;
let itemsPerPage = 6;
let currentFilters = {
    categories: [],
    priceRange: { min: 500, max: 5000 },
    availability: [],
    sortBy: 'relevancia'
};

// Inicializar productos en localStorage si no existen
function initializeProducts() {
    if (!localStorage.getItem('ecomarket_products')) {
        localStorage.setItem('ecomarket_products', JSON.stringify(defaultProducts));
        console.log('Productos inicializados en localStorage');
    }
}

// Obtener productos del localStorage
function getProducts() {
    const products = localStorage.getItem('ecomarket_products');
    return products ? JSON.parse(products) : defaultProducts;
}

// Guardar productos en localStorage
function saveProducts(products) {
    localStorage.setItem('ecomarket_products', JSON.stringify(products));
    // Trigger evento para que admin.html se actualice
    window.dispatchEvent(new CustomEvent('productsUpdated', { detail: products }));
    console.log('Productos guardados en localStorage');
}

// Función para agregar producto al carrito
function addToCart(productId) {
    const products = getProducts();
    const product = products.find(p => p.id === productId);
    
    if (!product) {
        console.error('Producto no encontrado:', productId);
        return;
    }

    // Obtener cantidad del selector
    const productCard = document.querySelector(`[onclick="addToCart('${productId}')"]`).closest('.product-card');
    const qtyInput = productCard.querySelector('.qty-input');
    const quantity = parseInt(qtyInput.value) || 1;

    // Verificar stock disponible
    if (quantity > product.stock) {
        alert(`Solo hay ${product.stock} unidades disponibles`);
        return;
    }

    // Obtener carrito actual
    let cart = JSON.parse(localStorage.getItem('ecomarket_cart')) || [];
    
    // Buscar si el producto ya está en el carrito
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        // Si ya existe, actualizar cantidad
        const newQuantity = existingItem.quantity + quantity;
        if (newQuantity <= product.stock) {
            existingItem.quantity = newQuantity;
        } else {
            alert(`Solo puedes agregar ${product.stock - existingItem.quantity} unidades más`);
            return;
        }
    } else {
        // Si no existe, agregar nuevo item
        cart.push({
            id: productId,
            name: product.name,
            price: product.price,
            unit: product.unit,
            image: product.image,
            quantity: quantity,
            maxStock: product.stock
        });
    }

    // Guardar carrito y actualizar contador
    localStorage.setItem('ecomarket_cart', JSON.stringify(cart));
    updateCartCount();
    
    // Feedback visual
    const addButton = productCard.querySelector('.btn-add-cart');
    const originalText = addButton.innerHTML;
    addButton.innerHTML = '<i class="bi bi-check-circle"></i> ¡Agregado!';
    addButton.style.background = 'linear-gradient(135deg, #28a745, #34ce57)';
    
    setTimeout(() => {
        addButton.innerHTML = originalText;
        addButton.style.background = 'linear-gradient(135deg, #008c5a, #00b374)';
    }, 1500);

    console.log('Producto agregado al carrito:', { productId, quantity, total: cart.length });
}

// Actualizar contador del carrito
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('ecomarket_cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartBadge = document.getElementById('cart-count');
    if (cartBadge) {
        cartBadge.textContent = totalItems;
        
        // Animación del badge
        cartBadge.style.transform = 'scale(1.3)';
        setTimeout(() => {
            cartBadge.style.transform = 'scale(1)';
        }, 200);
    }
}

// Funciones para los controles de cantidad
function setupQuantityControls() {
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('qty-btn')) {
            const input = e.target.parentElement.querySelector('.qty-input');
            const isPlus = e.target.classList.contains('plus');
            let value = parseInt(input.value) || 1;
            const max = parseInt(input.getAttribute('max')) || 999;
            
            if (isPlus && value < max) {
                value++;
            } else if (!isPlus && value > 1) {
                value--;
            }
            
            input.value = value;
        }
    });
}

// Funciones para los filtros mejorados
function toggleFilterSection(sectionId) {
    const content = document.getElementById(sectionId + '-content');
    const icon = document.getElementById(sectionId + '-icon');
    const title = content.previousElementSibling;
    
    if (content.classList.contains('active')) {
        content.classList.remove('active');
        icon.style.transform = 'rotate(0deg)';
        title.classList.remove('active');
    } else {
        content.classList.add('active');
        icon.style.transform = 'rotate(180deg)';
        title.classList.add('active');
    }
}

// Función para saltar a página específica
function jumpToPage() {
    const pageInput = document.querySelector('.page-input');
    const pageNumber = parseInt(pageInput.value);
    const totalPages = Math.ceil(getFilteredProducts().length / itemsPerPage);
    
    if (pageNumber >= 1 && pageNumber <= totalPages) {
        currentPage = pageNumber;
        renderProducts();
        updatePagination();
        
        // Scroll al inicio de los productos
        document.getElementById('productos-lista').scrollIntoView({ behavior: 'smooth' });
    } else {
        alert(`Por favor ingresa un número entre 1 y ${totalPages}`);
    }
}

// Filtrar productos según criterios actuales
function getFilteredProducts() {
    let products = getProducts();
    
    // Filtrar por categorías
    if (currentFilters.categories.length > 0) {
        products = products.filter(product => 
            currentFilters.categories.includes(product.category)
        );
    }
    
    // Filtrar por rango de precios
    products = products.filter(product => 
        product.price >= currentFilters.priceRange.min && 
        product.price <= currentFilters.priceRange.max
    );
    
    // Filtrar por disponibilidad
    if (currentFilters.availability.length > 0) {
        products = products.filter(product => {
            if (currentFilters.availability.includes('en-stock')) {
                return product.stock > 5;
            }
            if (currentFilters.availability.includes('poco-stock')) {
                return product.stock <= 5 && product.stock > 0;
            }
            if (currentFilters.availability.includes('proximamente')) {
                return product.stock === 0;
            }
            return true;
        });
    }
    
    // Ordenar productos
    switch (currentFilters.sortBy) {
        case 'precio-menor':
            products.sort((a, b) => a.price - b.price);
            break;
        case 'precio-mayor':
            products.sort((a, b) => b.price - a.price);
            break;
        case 'nombre-az':
            products.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'nombre-za':
            products.sort((a, b) => b.name.localeCompare(a.name));
            break;
        case 'mas-vendidos':
            products.sort((a, b) => b.reviews - a.reviews);
            break;
        case 'novedades':
            products.sort((a, b) => b.isNew - a.isNew);
            break;
        default: // relevancia
            products.sort((a, b) => b.rating - a.rating);
    }
    
    return products;
}

// Renderizar productos en la página
function renderProducts() {
    const container = document.getElementById('productos-lista');
    const filteredProducts = getFilteredProducts();
    
    // Si no hay productos filtrados, mostrar mensaje
    if (filteredProducts.length === 0) {
        container.innerHTML = `
            <div class="col-12">
                <div class="alert alert-info text-center py-5">
                    <div class="mb-3">
                        <i class="bi bi-search" style="font-size: 3rem; color: #6c757d;"></i>
                    </div>
                    <h4>No se encontraron productos</h4>
                    <p class="mb-3">No hay productos que coincidan con los filtros seleccionados.</p>
                    <button class="btn btn-outline-success" onclick="clearFilters()">
                        <i class="bi bi-arrow-counterclockwise"></i> Limpiar filtros
                    </button>
                </div>
            </div>
        `;
        return;
    }
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const productsToShow = filteredProducts.slice(startIndex, endIndex);
    
    // Limpiar todos los productos y renderizar solo los filtrados
    container.innerHTML = '';
    
    // Agregar productos filtrados
    productsToShow.forEach(product => {
        const productHTML = createProductCard(product);
        container.insertAdjacentHTML('beforeend', productHTML);
    });
    
    // Actualizar información de resultados
    const actualEndIndex = Math.min(endIndex, filteredProducts.length);
    updateResultsInfo(filteredProducts.length, startIndex + 1, actualEndIndex);
}

// Crear HTML para una tarjeta de producto
function createProductCard(product) {
    const stockPercentage = (product.stock / product.maxStock) * 100;
    const stockClass = product.stock > 5 ? 'in-stock' : product.stock > 0 ? 'low-stock' : 'out-stock';
    const stockText = product.stock > 5 ? 'En Stock' : product.stock > 0 ? 'Poco Stock' : 'Sin Stock';
    
    const colClass = currentView === 'list' ? 'col-12' : 'col-md-4';
    const cardClass = currentView === 'list' ? 'product-card-list' : 'product-card';
    
    if (currentView === 'list') {
        // Vista de lista horizontal
        return `
            <div class="${colClass}">
                <div class="${cardClass} d-flex">
                    <div class="product-image-container-list">
                        <img src="${product.image}" class="product-image-list" alt="${product.name}">
                        <div class="product-badges">
                            ${product.isOffer ? '<span class="badge-offer">-' + Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) + '%</span>' : ''}
                            ${product.isNew ? '<span class="badge-new">Nuevo</span>' : ''}
                            <span class="badge-stock ${stockClass}">${stockText}</span>
                        </div>
                    </div>
                    <div class="product-info-list flex-grow-1">
                        <div class="d-flex justify-content-between align-items-start">
                            <div>
                                <div class="product-category">${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</div>
                                <h5 class="product-title mb-2">${product.name}</h5>
                                <p class="product-description mb-2">${product.description}</p>
                                <div class="product-rating mb-2">
                                    <div class="stars">
                                        ${'<i class="bi bi-star-fill"></i>'.repeat(Math.floor(product.rating))}
                                        ${product.rating % 1 ? '<i class="bi bi-star-half"></i>' : ''}
                                        ${'<i class="bi bi-star"></i>'.repeat(5 - Math.ceil(product.rating))}
                                    </div>
                                    <span class="rating-text">(${product.rating}) ${product.reviews} reseñas</span>
                                </div>
                                <div class="product-stock-inline">
                                    <span class="stock-text">Stock: </span>
                                    <span class="stock-quantity">${product.stock} unidades</span>
                                </div>
                            </div>
                            <div class="product-actions-list">
                                <div class="product-price mb-2">
                                    ${product.originalPrice ? `<span class="price-old">$${product.originalPrice.toLocaleString()}</span>` : ''}
                                    <span class="price-current">$${product.price.toLocaleString()}</span>
                                    <span class="price-unit">por ${product.unit}</span>
                                </div>
                                <div class="d-flex gap-2 align-items-center">
                                    <div class="quantity-selector-small">
                                        <button class="qty-btn minus">-</button>
                                        <input type="number" class="qty-input" value="1" min="1" max="${product.stock}">
                                        <button class="qty-btn plus">+</button>
                                    </div>
                                    <button class="btn-add-cart-small" onclick="addToCart('${product.id}')" ${product.stock === 0 ? 'disabled' : ''}>
                                        <i class="bi bi-cart-plus"></i>
                                        <span>${product.stock === 0 ? 'Sin Stock' : 'Agregar'}</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    } else {
        // Vista de cuadrícula (original)
        return `
            <div class="${colClass}">
                <div class="${cardClass}">
                    <div class="product-image-container">
                        <img src="${product.image}" class="product-image" alt="${product.name}">
                        <div class="product-badges">
                            ${product.isOffer ? '<span class="badge-offer">-' + Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) + '%</span>' : ''}
                            ${product.isNew ? '<span class="badge-new">Nuevo</span>' : ''}
                            <span class="badge-stock ${stockClass}">${stockText}</span>
                        </div>
                        <div class="product-overlay">
                            <button class="btn-quick-view" title="Vista rápida">
                                <i class="bi bi-eye"></i>
                            </button>
                        </div>
                    </div>
                    <div class="product-info">
                        <div class="product-category">${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</div>
                        <h5 class="product-title">${product.name}</h5>
                        <p class="product-description">${product.description}</p>
                        <div class="product-rating">
                            <div class="stars">
                                ${'<i class="bi bi-star-fill"></i>'.repeat(Math.floor(product.rating))}
                                ${product.rating % 1 ? '<i class="bi bi-star-half"></i>' : ''}
                                ${'<i class="bi bi-star"></i>'.repeat(5 - Math.ceil(product.rating))}
                            </div>
                            <span class="rating-text">(${product.rating}) ${product.reviews} reseñas</span>
                        </div>
                        <div class="product-stock">
                            <div class="stock-info">
                                <span class="stock-text">Stock disponible: </span>
                                <span class="stock-quantity">${product.stock} unidades</span>
                            </div>
                            <div class="stock-bar">
                                <div class="stock-fill ${product.stock <= 5 ? 'low' : ''}" style="width: ${stockPercentage}%"></div>
                            </div>
                        </div>
                        <div class="product-price">
                            ${product.originalPrice ? `<span class="price-old">$${product.originalPrice.toLocaleString()}</span>` : ''}
                            <span class="price-current">$${product.price.toLocaleString()}</span>
                            <span class="price-unit">por ${product.unit}</span>
                        </div>
                        <div class="product-actions">
                            <div class="quantity-selector">
                                <button class="qty-btn minus">-</button>
                                <input type="number" class="qty-input" value="1" min="1" max="${product.stock}">
                                <button class="qty-btn plus">+</button>
                            </div>
                            <button class="btn-add-cart" onclick="addToCart('${product.id}')" ${product.stock === 0 ? 'disabled' : ''}>
                                <i class="bi bi-cart-plus"></i>
                                <span>${product.stock === 0 ? 'Sin Stock' : 'Agregar'}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

// Actualizar información de resultados
function updateResultsInfo(totalProducts, startItem, endItem) {
    const showingElement = document.getElementById('showing-count');
    const totalElement = document.getElementById('total-count');
    
    if (showingElement && totalElement) {
        showingElement.textContent = `${startItem}-${endItem}`;
        totalElement.textContent = totalProducts;
    }
    
    // Actualizar información de paginación
    const paginationInfo = document.querySelector('.pagination-info span');
    if (paginationInfo) {
        paginationInfo.innerHTML = `Mostrando <strong>${startItem}-${endItem}</strong> de <strong>${totalProducts}</strong> productos`;
    }
}

// Actualizar contador de productos encontrados
function updateProductsFoundCount() {
    const filteredProducts = getFilteredProducts();
    const totalProducts = filteredProducts.length;
    
    // Actualizar el título de "Productos encontrados"
    const productsFoundElement = document.querySelector('.col-9 h2');
    if (productsFoundElement) {
        productsFoundElement.textContent = 'Productos encontrados';
    }
    
    // Actualizar el subtítulo con la cantidad
    const productsSubtitle = document.querySelector('.col-9 p');
    if (productsSubtitle) {
        if (totalProducts === 0) {
            productsSubtitle.textContent = 'No se encontraron productos que coincidan con los filtros seleccionados';
        } else {
            const startItem = (currentPage - 1) * itemsPerPage + 1;
            const endItem = Math.min(currentPage * itemsPerPage, totalProducts);
            productsSubtitle.textContent = `Mostrando ${startItem}-${endItem} de ${totalProducts} productos`;
        }
    }
}

// Actualizar paginación
function updatePagination() {
    const totalProducts = getFilteredProducts().length;
    const totalPages = Math.ceil(totalProducts / itemsPerPage);
    const paginationContainer = document.querySelector('.pagination-custom');
    
    if (!paginationContainer) return;
    
    // Limpiar paginación actual
    paginationContainer.innerHTML = '';
    
    // Botón anterior
    const prevDisabled = currentPage === 1 ? 'disabled' : '';
    paginationContainer.innerHTML += `
        <li class="page-item-custom ${prevDisabled}">
            <a class="page-link-custom" href="#" onclick="goToPage(${currentPage - 1})" data-page="prev">
                <i class="bi bi-chevron-left"></i>
                <span class="page-text">Anterior</span>
            </a>
        </li>
    `;
    
    // Páginas numeradas
    for (let i = 1; i <= Math.min(totalPages, 5); i++) {
        const active = i === currentPage ? 'active' : '';
        paginationContainer.innerHTML += `
            <li class="page-item-custom ${active}">
                <a class="page-link-custom" href="#" onclick="goToPage(${i})" data-page="${i}">${i}</a>
            </li>
        `;
    }
    
    // Puntos suspensivos si hay más páginas
    if (totalPages > 5) {
        paginationContainer.innerHTML += `
            <li class="page-item-custom">
                <a class="page-link-custom page-dots" href="#">...</a>
            </li>
            <li class="page-item-custom">
                <a class="page-link-custom" href="#" onclick="goToPage(${totalPages})" data-page="${totalPages}">${totalPages}</a>
            </li>
        `;
    }
    
    // Botón siguiente
    const nextDisabled = currentPage === totalPages ? 'disabled' : '';
    paginationContainer.innerHTML += `
        <li class="page-item-custom ${nextDisabled}">
            <a class="page-link-custom" href="#" onclick="goToPage(${currentPage + 1})" data-page="next">
                <span class="page-text">Siguiente</span>
                <i class="bi bi-chevron-right"></i>
            </a>
        </li>
    `;
    
    // Actualizar input de salto de página
    const pageInput = document.querySelector('.page-input');
    if (pageInput) {
        pageInput.max = totalPages;
        pageInput.value = currentPage;
    }
}

// Ir a página específica
function goToPage(page) {
    const totalPages = Math.ceil(getFilteredProducts().length / itemsPerPage);
    if (page >= 1 && page <= totalPages) {
        currentPage = page;
        renderProducts();
        updatePagination();
        
        // Scroll al inicio de los productos
        document.getElementById('productos-lista').scrollIntoView({ behavior: 'smooth' });
    }
}

// Funciones para aplicar y limpiar filtros
function applyFilters() {
    // Obtener categorías seleccionadas
    currentFilters.categories = [];
    document.querySelectorAll('.category-checkbox:checked').forEach(cb => {
        currentFilters.categories.push(cb.value);
    });
    
    // Obtener rango de precios
    const minPrice = parseInt(document.getElementById('precio-min').value) || 500;
    const maxPrice = parseInt(document.getElementById('precio-max').value) || 5000;
    currentFilters.priceRange = { min: minPrice, max: maxPrice };
    
    // Obtener disponibilidad seleccionada
    currentFilters.availability = [];
    document.querySelectorAll('.availability-checkbox:checked').forEach(cb => {
        currentFilters.availability.push(cb.value);
    });
    
    // Obtener ordenación
    const sortSelect = document.getElementById('sort-options');
    if (sortSelect) {
        currentFilters.sortBy = sortSelect.value;
    }
    
    // Resetear a primera página y renderizar
    currentPage = 1;
    renderProducts();
    updatePagination();
    
    // Actualizar contador de productos encontrados
    updateProductsFoundCount();
    
    console.log('Filtros aplicados:', currentFilters);
    console.log('Productos filtrados:', getFilteredProducts().length);
}

function clearFilters() {
    // Limpiar checkboxes de categorías
    document.querySelectorAll('.category-checkbox').forEach(cb => cb.checked = false);
    
    // Limpiar checkboxes de disponibilidad
    document.querySelectorAll('.availability-checkbox').forEach(cb => cb.checked = false);
    
    // Resetear precios
    document.getElementById('precio-min').value = 500;
    document.getElementById('precio-max').value = 5000;
    document.getElementById('precio-range').value = 2750;
    document.getElementById('current-price').textContent = '$2,750';
    
    // Resetear ordenación
    document.getElementById('sort-options').value = 'relevancia';
    
    // Limpiar filtros y renderizar
    currentFilters = {
        categories: [],
        priceRange: { min: 500, max: 5000 },
        availability: [],
        sortBy: 'relevancia'
    };
    
    currentPage = 1;
    renderProducts();
    updatePagination();
    
    console.log('Filtros limpiados');
}

function resetAllFilters() {
    clearFilters();
}

// Funciones para el slider de precios
function setupPriceSlider() {
    const slider = document.getElementById('precio-range');
    const currentPrice = document.getElementById('current-price');
    const minInput = document.getElementById('precio-min');
    const maxInput = document.getElementById('precio-max');
    
    if (slider && currentPrice) {
        slider.addEventListener('input', function() {
            const value = parseInt(this.value);
            currentPrice.textContent = `$${value.toLocaleString()}`;
            maxInput.value = value;
        });
        
        // Sincronizar inputs con slider
        minInput.addEventListener('input', function() {
            const min = parseInt(this.value) || 500;
            const max = parseInt(maxInput.value) || 5000;
            if (min < max) {
                slider.min = min;
            }
        });
        
        maxInput.addEventListener('input', function() {
            const max = parseInt(this.value) || 5000;
            slider.value = max;
            currentPrice.textContent = `$${max.toLocaleString()}`;
        });
    }
}

// Escuchar actualizaciones de productos desde admin
window.addEventListener('productsUpdated', function(event) {
    console.log('Productos actualizados desde admin:', event.detail);
    renderProducts();
    updatePagination();
});

// Variable para el tipo de vista actual
let currentView = 'grid';

// Función para cambiar vista
function changeView(viewType) {
    currentView = viewType;
    
    // Actualizar botones
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-view') === viewType) {
            btn.classList.add('active');
        }
    });
    
    // Actualizar contenedor de productos
    const container = document.getElementById('productos-lista');
    if (viewType === 'list') {
        container.classList.add('list-view');
    } else {
        container.classList.remove('list-view');
    }
    
    // Re-renderizar productos con la nueva vista
    renderProducts();
}

// Inicialización cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    initializeProducts();
    updateCartCount();
    setupQuantityControls();
    setupPriceSlider();
    
    // Configurar event listeners para filtros
    document.querySelectorAll('.category-checkbox, .availability-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', applyFilters);
    });
    
    document.getElementById('sort-options').addEventListener('change', applyFilters);
    
    // Configurar botones de vista
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const view = btn.getAttribute('data-view');
            changeView(view);
        });
    });
    
    // Renderizar productos iniciales
    renderProducts();
    updatePagination();
    updateProductsFoundCount();
    
    console.log('Sistema de catálogo inicializado');
});