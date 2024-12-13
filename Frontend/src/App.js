// App.js
import React, { useState } from "react";
import Dashboard from './components/Dashboard';
import ProductForm from './components/ProductForm';
import StockTable from './components/StockTable';
import FontSizeController from './components/FontSizeController'; // Importa el componente

function App() {
  const [products, setProducts] = useState([]);
  // Callback para actualizar la lista de productos
  const handleProductAdded = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

return (
  <div>
     <FontSizeController />
    <header>
      <h1 style={{ textAlign: "center", padding: "10px", backgroundColor: "#0056b3", color: "#fff" }}>
        Gestión de Inventario - Cafetería
      </h1>
    </header>
    <main>
      <Dashboard products={products} />
      <ProductForm onProductAdded={handleProductAdded} />
      <StockTable products={products} />
    </main>
  </div>
);
}

export default App;

