import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import './styles/global.css'; // Estilos globales
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);