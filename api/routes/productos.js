// routes/productos.js
// Rutas REST para el recurso "productos"

const express = require('express');
const router  = express.Router();
const data    = require('../data/productos.json');

/**
 * GET /api/productos
 * Soporta query params:
 *   - categoria  → filtra por categoría (remeras, pantalones, etc.)
 *   - badge      → filtra por badge (nuevo, oferta)
 *   - q          → búsqueda por nombre (case-insensitive)
 *   - limit      → cantidad máxima de resultados
 */
router.get('/', (req, res) => {
  const { categoria, badge, q, limit } = req.query;
  let result = [...data];

  if (categoria) {
    result = result.filter(p => p.categoria === categoria.toLowerCase());
  }

  if (badge) {
    result = result.filter(p => p.badge === badge.toLowerCase());
  }

  if (q) {
    const query = q.toLowerCase();
    result = result.filter(p => p.nombre.toLowerCase().includes(query));
  }

  if (limit) {
    result = result.slice(0, parseInt(limit));
  }

  res.json({ ok: true, total: result.length, data: result });
});

/**
 * GET /api/productos/categorias
 * Devuelve la lista única de categorías disponibles con su conteo
 */
router.get('/categorias', (req, res) => {
  const mapa = data.reduce((acc, p) => {
    acc[p.categoria] = (acc[p.categoria] || 0) + 1;
    return acc;
  }, {});

  const categorias = Object.entries(mapa).map(([nombre, cantidad]) => ({
    nombre,
    cantidad,
  }));

  res.json({ ok: true, data: categorias });
});

/**
 * GET /api/productos/:id
 * Devuelve un producto por ID
 */
router.get('/:id', (req, res) => {
  const producto = data.find(p => p.id === parseInt(req.params.id));
  if (!producto) {
    return res.status(404).json({ ok: false, error: 'Producto no encontrado' });
  }
  res.json({ ok: true, data: producto });
});

module.exports = router;
