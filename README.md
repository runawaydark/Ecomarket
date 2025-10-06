# EcoMarket 🥬🍎

## Descripción del Proyecto
EcoMarket es una plataforma de comercio electrónico enfocada en la venta de frutas y verduras orgánicas. Conecta directamente a los productores locales con los consumidores, promoviendo el comercio sostenible y productos frescos.

## Características Principales

### 🛒 **Funcionalidades del Usuario**
- Catálogo de productos con filtros avanzados
- Carrito de compras persistente
- Sistema de autenticación
- Gestión de pedidos
- Vista responsiva (móvil y desktop)

### 👨‍💼 **Panel Administrativo**
- Gestión completa de productos
- Control de inventario
- Seguimiento de pedidos
- Reportes y estadísticas

### 🎨 **Interfaz de Usuario**
- Diseño responsivo con Bootstrap 5
- Animaciones y transiciones suaves
- Sistema de notificaciones elegantes
- Múltiples vistas de productos (grid/lista)

## Estructura del Proyecto

```
Ecomarket/
├── frontend sprint 3/          # Aplicación principal
│   ├── assets/
│   │   ├── css/
│   │   │   └── style.css       # Estilos organizados por secciones
│   │   ├── js/
│   │   │   ├── app.js          # Funcionalidades globales
│   │   │   ├── catalog.js      # Sistema de catálogo
│   │   │   └── footer.js       # Componente footer
│   │   └── img/                # Imágenes del proyecto
│   ├── index.html              # Página principal
│   ├── catalogo.html           # Catálogo de productos
│   ├── carrito.html            # Carrito de compras
│   ├── admin.html              # Panel administrativo
│   └── [otros archivos HTML]
├── En01/                       # Versión anterior
├── En02/                       # Versión anterior
├── historias/                  # Historias de usuario
├── vercel.json                 # Configuración de despliegue
└── README.md                   # Este archivo
```

## Tecnologías Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Framework CSS**: Bootstrap 5.3.3
- **Iconos**: Bootstrap Icons, Font Awesome
- **Almacenamiento**: LocalStorage para persistencia
- **Deployment**: Vercel

## Instalación y Configuración

### Requisitos Previos
- Navegador web moderno
- Servidor web local (opcional para desarrollo)

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone [URL_DEL_REPOSITORIO]
   cd Ecomarket
   ```

2. **Servir el proyecto**
   ```bash
   # Opción 1: Con servidor local
   cd "frontend sprint 3"
   python -m http.server 8000
   
   # Opción 2: Abrir directamente
   # Abrir index.html en el navegador
   ```

3. **Acceder a la aplicación**
   - Navegue a `http://localhost:8000` (si usa servidor)
   - O abra `frontend sprint 3/index.html` directamente

## Funcionalidades Detalladas

### 🏠 **Página Principal (index.html)**
- Carrusel de imágenes promocionales
- Categorías de productos destacadas
- Productos destacados aleatorios
- Información sobre beneficios de la empresa

### 📱 **Catálogo (catalogo.html)**
- Filtros por categoría, precio y disponibilidad
- Ordenamiento múltiple
- Paginación dinámica
- Vista grid/lista intercambiable
- Búsqueda en tiempo real

### 🛒 **Carrito (carrito.html)**
- Gestión de productos agregados
- Cálculo automático de totales
- Modificación de cantidades
- Proceso de checkout

### ⚙️ **Panel Admin (admin.html)**
- CRUD completo de productos
- Gestión de inventario
- Reportes de ventas
- Control de usuarios

## API y Almacenamiento

### LocalStorage
El proyecto utiliza LocalStorage para persistir datos:

```javascript
// Productos
localStorage.setItem('ecomarket_products', JSON.stringify(products));

// Carrito
localStorage.setItem('ecomarket_cart', JSON.stringify(cart));

// Autenticación
localStorage.setItem('ecomarket_user_session', JSON.stringify(session));
```

### Estructura de Datos

**Producto:**
```javascript
{
  id: "string",
  name: "string",
  category: "frutas|verduras|despensa",
  description: "string", 
  price: number,
  originalPrice: number,
  unit: "kg|unidad|litro",
  stock: number,
  maxStock: number,
  image: "string",
  rating: number,
  reviews: number,
  isNew: boolean,
  isOffer: boolean,
  available: boolean
}
```

## Despliegue

### Vercel (Recomendado)
El proyecto incluye configuración para Vercel:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/frontend sprint 3/$1"
    }
  ]
}
```

### Otros Servicios
- **Netlify**: Subir carpeta `frontend sprint 3`
- **GitHub Pages**: Configurar directorio de publicación
- **Servidor tradicional**: Copiar archivos al directorio web

## Contribución

### Estándares de Código
- **HTML**: Semántico y accesible
- **CSS**: Organizado por secciones con comentarios
- **JavaScript**: Funciones documentadas con JSDoc
- **Responsive**: Mobile-first design

### Estructura de Commits
```
tipo: descripción breve

Descripción detallada del cambio
- Cambio específico 1
- Cambio específico 2
```

### Tipos de Commit
- `feat`: Nueva funcionalidad
- `fix`: Corrección de bug
- `docs`: Documentación
- `style`: Cambios de formato
- `refactor`: Refactorización de código
- `test`: Pruebas

## Roadmap

### Versión 2.0
- [ ] Base de datos real (MySQL/PostgreSQL)
- [ ] Backend con Node.js/Express
- [ ] Sistema de pagos online
- [ ] Notificaciones push
- [ ] App móvil nativa

### Mejoras Pendientes
- [ ] Optimización de imágenes
- [ ] Sistema de reviews
- [ ] Chat de soporte
- [ ] Integración con redes sociales
- [ ] PWA (Progressive Web App)

## Licencia

Este proyecto es para fines educativos como parte del trabajo de desarrollo web.

## Contacto

Para preguntas o sugerencias sobre el proyecto, crear un issue en el repositorio.

---

**EcoMarket** - Frutas y verduras frescas directo a tu mesa 🌱