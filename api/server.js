// server.js — Entry point de la API REST
// Levanta Express en el puerto 3001

const express = require('express');
const cors    = require('cors');

const productosRouter = require('./routes/productos');

const app  = express();
const PORT = process.env.PORT || 3001;

// ── Middlewares ────────────────────────────────────────────
app.use(cors({ origin: 'http://localhost:5173' })); // origen de Vite dev server
app.use(express.json());

// ── Rutas ──────────────────────────────────────────────────
app.use('/api/productos', productosRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ ok: true, message: 'OneTwice API funcionando 🛍️' });
});

// 404 catch-all
app.use((req, res) => {
  res.status(404).json({ ok: false, error: 'Ruta no encontrada' });
});

// ── Arranque ───────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ API corriendo en http://localhost:${PORT}`);
});
