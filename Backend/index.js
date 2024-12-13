const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const app = express();

const productRoutes = require("./routes/products");

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Rutas
app.use("/api/products", productRoutes);

dotenv.config();

// Conexión a MongoDB
//Conexion a la BD
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
      console.log('Conectado a la base de datos');
    })
    .catch((error) => {
      console.error('Error al conectar a la base de datos:', error);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
