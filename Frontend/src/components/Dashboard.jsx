// components/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'; // Importar elementos de Chart.js
import { fetchProducts } from '../api';
import '../styles/Dashboard.css';

// Registrar los elementos de Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [categories, setCategories] = useState({});
  const [lowStock, setLowStock] = useState([]);
  const [expiring, setExpiring] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      const products = await fetchProducts();
      const categoryCount = { bebidas: 0, alimentos: 0, otros: 0 };
      const lowStockItems = [];
      const expiringItems = [];

      products.forEach((product) => {
        categoryCount[product.category] += product.quantity;

        if (product.quantity < 5) lowStockItems.push(product);
        if (new Date(product.expirationDate) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)) {
          expiringItems.push(product);
        }
      });

      setCategories(categoryCount);
      setLowStock(lowStockItems);
      setExpiring(expiringItems);
    };
    loadProducts();
  }, []);

  return (
    <div className="dashboard">
      <h1>Panel de Control</h1>
      <div className="charts">
      <div aria-label="Gráfico de stock por categoría" role="img">
        <Pie
          data={{
            labels: ['Bebidas', 'Alimentos', 'Otros'],
            datasets: [
              {
                label: 'Stock por Categoría',
                data: Object.values(categories),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
              },
            ],
          }}
        />
        </div>
      </div>
      <div className="stats">
        <div>
          <h2>Productos Bajos en Stock</h2>
          <ul aria-live="polite">
            {lowStock.map((item) => (
              <li key={item._id}>{item.name} - {item.quantity} unidades</li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Próximos a Vencer</h2>
          <ul>
    {expiring.map((item) => {
      const isExpired = new Date(item.expirationDate) < new Date();
      return (
        <li key={item._id} className={isExpired ? "expired" : ""}>
          {item.name} - vence el {new Date(item.expirationDate).toLocaleDateString()}
        </li>
      );
    })}
  </ul>
</div>
      </div>
    </div>
  );
};

export default Dashboard;
