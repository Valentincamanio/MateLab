# OneTwice — Ecommerce de Ropa

Ecommerce fullstack con **Express REST API** + **React + Vite** (JSX), separados en capas.

## Estructura del proyecto

```
onetwice/
├── api/                         ← REST API con Express
│   ├── server.js                  Punto de entrada del servidor
│   ├── routes/
│   │   └── productos.js           Rutas GET /api/productos
│   ├── data/
│   │   └── productos.json         Base de datos (archivo JSON)
│   └── package.json
│
└── frontend/                    ← App React con Vite
    ├── index.html
    ├── vite.config.js             Proxy /api → localhost:3001
    ├── package.json
    └── src/
        ├── main.jsx               Entry point
        ├── App.jsx                Componente raíz
        ├── styles/
        │   └── global.css
        ├── services/
        │   └── api.js             Capa de comunicación con la API
        ├── hooks/
        │   └── useProductos.js    Hooks personalizados (fetch + estado)
        ├── context/
        │   └── CartContext.jsx    Estado global del carrito (useReducer)
        └── components/
            ├── Navbar.jsx
            ├── Hero.jsx
            ├── ProductGrid.jsx    Grid con filtros y búsqueda
            ├── ProductCard.jsx
            ├── CartSidebar.jsx
            └── Footer.jsx
```

## Instalación y uso

### 1. Instalar dependencias

```bash
# API
cd api
npm install

# Frontend
cd ../frontend
npm install
```

### 2. Levantar la API (terminal 1)

```bash
cd api
npm run dev       # con nodemon (recarga automática)
# o
npm start         # sin nodemon
```

La API queda en: `http://localhost:3001`

### 3. Levantar el frontend (terminal 2)

```bash
cd frontend
npm run dev
```

El frontend queda en: `http://localhost:5173`

---

## Endpoints disponibles

| Método | Ruta                        | Descripción                         |
|--------|-----------------------------|-------------------------------------|
| GET    | `/api/health`               | Health check                        |
| GET    | `/api/productos`            | Todos los productos                 |
| GET    | `/api/productos?categoria=remeras` | Filtro por categoría         |
| GET    | `/api/productos?badge=oferta`      | Filtro por badge             |
| GET    | `/api/productos?q=jean`            | Búsqueda por nombre          |
| GET    | `/api/productos?limit=4`           | Limitar resultados           |
| GET    | `/api/productos/categorias` | Lista de categorías con conteo      |
| GET    | `/api/productos/:id`        | Producto por ID                     |

## Capas de la arquitectura

| Capa           | Archivo(s)                      | Responsabilidad                        |
|----------------|---------------------------------|----------------------------------------|
| Datos          | `api/data/productos.json`       | Fuente única de verdad                 |
| Rutas API      | `api/routes/productos.js`       | Lógica de filtrado y respuestas REST   |
| Servidor       | `api/server.js`                 | Middlewares, CORS, arranque            |
| Servicio       | `src/services/api.js`           | Fetch + manejo de errores centralizado |
| Hooks          | `src/hooks/useProductos.js`     | Estado de fetch (loading/error/data)   |
| Estado global  | `src/context/CartContext.jsx`   | Carrito con useReducer                 |
| Presentación   | `src/components/*.jsx`          | UI pura, sin lógica de negocio         |
