// services/api.js
// Capa de servicio: toda comunicación con la API REST pasa por aquí.
// El resto de la app nunca usa fetch() directamente.

const BASE_URL = '/api'; // Vite proxy redirige a http://localhost:3001

/**
 * Wrapper genérico para fetch con manejo de errores centralizado.
 * @param {string} endpoint
 * @returns {Promise<any>}
 */
async function request(endpoint) {
  const response = await fetch(`${BASE_URL}${endpoint}`);
  const json = await response.json();

  if (!response.ok || !json.ok) {
    throw new Error(json.error || `Error ${response.status}`);
  }

  return json;
}

/**
 * Obtiene todos los productos con filtros opcionales.
 * @param {{ categoria?: string, badge?: string, q?: string, limit?: number }} params
 */
export async function getProductos(params = {}) {
  const query = new URLSearchParams();
  if (params.categoria) query.set('categoria', params.categoria);
  if (params.badge)     query.set('badge', params.badge);
  if (params.q)         query.set('q', params.q);
  if (params.limit)     query.set('limit', params.limit);

  const qs = query.toString();
  const { data } = await request(`/productos${qs ? `?${qs}` : ''}`);
  return data;
}

/**
 * Obtiene las categorías disponibles con su conteo de productos.
 */
export async function getCategorias() {
  const { data } = await request('/productos/categorias');
  return data;
}

/**
 * Obtiene un producto por ID.
 * @param {number} id
 */
export async function getProductoById(id) {
  const { data } = await request(`/productos/${id}`);
  return data;
}
