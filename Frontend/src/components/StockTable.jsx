import React, { useEffect, useState } from 'react';
import { fetchProducts, deleteProduct } from '../api';
import '../styles/StockTable.css';

const StockTable = () => {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState(''); // Para búsqueda por nombre
  const [categoryFilter, setCategoryFilter] = useState(''); // Para filtrar por categoría

  useEffect(() => {
    const loadProducts = async () => {
      const items = await fetchProducts();
      const filteredItems = items.filter((product) => {
        const matchesQuery = product.name.toLowerCase().includes(query.toLowerCase());
        const matchesCategory = categoryFilter === '' || product.category === categoryFilter;
        return matchesQuery && matchesCategory;
      });
      setProducts(filteredItems);
    };
    loadProducts();
  }, [query, categoryFilter]); // Ejecutar cada vez que cambie query o categoría

  const handleDelete = async (id) => {
    await deleteProduct(id);
    setProducts(products.filter((p) => p._id !== id));
  };

  return (
    <div className="stock-table">
      <h2>Inventario</h2>
      <div className="filters">
        <input
          type="text"
          placeholder="Buscar por nombre"
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Buscar por nombre"
        />
        <select
          onChange={(e) => setCategoryFilter(e.target.value)}
          aria-label="Filtrar por categoría"
        >
          <option value="">Todas las categorías</option>
          <option value="bebidas">Bebidas</option>
          <option value="alimentos">Alimentos</option>
          <option value="otros">Otros</option>
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Cantidad</th>
            <th>Precio Unitario</th>
            <th>Vencimiento</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td data-label="Nombre">{product.name}</td>
              <td data-label="Categoría">{product.category}</td>
              <td data-label="Cantidad">{product.quantity}</td>
              <td data-label="Precio Unitario">${product.price}</td>
              <td data-label="Vencimiento">
                {new Date(product.expirationDate).toLocaleDateString()}
              </td>
              <td>
                <button
                  aria-label={`Eliminar producto ${product.name}`}
                  onClick={() => handleDelete(product._id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockTable;
