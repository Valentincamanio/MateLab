// hooks/useProductos.js
// Hook personalizado que encapsula el fetch de productos con estado de carga/error.

import { useState, useEffect, useCallback } from 'react';
import { getProductos, getCategorias } from '../services/api';

/**
 * Hook para obtener productos con filtros reactivos.
 * @param {{ categoria?: string, badge?: string, q?: string }} filtros
 */
export function useProductos(filtros = {}) {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(null);

  const fetchProductos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProductos(filtros);
      setProductos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtros.categoria, filtros.badge, filtros.q]);

  useEffect(() => { fetchProductos(); }, [fetchProductos]);

  return { productos, loading, error, refetch: fetchProductos };
}

/**
 * Hook para obtener la lista de categorías.
 */
export function useCategorias() {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState(null);

  useEffect(() => {
    getCategorias()
      .then(setCategorias)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { categorias, loading, error };
}
