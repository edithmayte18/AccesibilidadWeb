// components/ProductForm.jsx
import React, { useState } from 'react';
import { createProduct } from '../api';
import '../styles/ProductForm.css';

const ProductForm = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    category: '',
    quantity: '',
    price: '',
    expirationDate: '',
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createProduct(product);
    alert('Producto creado exitosamente');
    setProduct({ name: '', description: '', category: '', quantity: 0, price: 0, expirationDate: '' });
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <h2>Registro de Producto</h2>
      <input name="name" placeholder="Nombre" value={product.name} onChange={handleChange} required aria-label="Nombre del producto"/>
      <input name="description" placeholder="Descripción" value={product.description} onChange={handleChange} />
      <select name="category" value={product.category} onChange={handleChange} required>
        <option value="">Categoría</option>
        <option value="bebidas">Bebidas</option>
        <option value="alimentos">Alimentos</option>
        <option value="otros" aria-label="Otros">Otros</option>
      </select>
      <input name="quantity" type="number" placeholder="Cantidad" value={product.quantity} onChange={handleChange} required aria-label="Cantidad"/>
      <input name="price" type="number" placeholder="Precio unitario" value={product.price} onChange={handleChange} required aria-label="Precio"/>
      <input name="expirationDate" type="date" value={product.expirationDate} onChange={handleChange} required aria-label="Fecha de vencimiento"/>
      <button type="submit">Guardar</button>
    </form>
  );
};

export default ProductForm;
