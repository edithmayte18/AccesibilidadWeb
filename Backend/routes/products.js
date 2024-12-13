const express = require('express');
const Product = require('../models/product');
const router = express.Router();

// Obtener todos los productos o filtrados
router.get('/', async (req, res) => {
    try {
        const { category, name } = req.query;
        const filter = {};
        if (category) filter.category = category;
        if (name) filter.name = new RegExp(name, 'i');

        const products = await Product.find(filter);
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener productos' });
    }
});

// Crear un nuevo producto
router.post('/', async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json(product);
    } catch (err) {
        res.status(400).json({ error: 'Error al crear producto' });
    }
});

// Actualizar un producto
router.put('/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
        res.json(product);
    } catch (err) {
        res.status(400).json({ error: 'Error al actualizar producto' });
    }
});

// Eliminar un producto
router.delete('/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
        res.json({ message: 'Producto eliminado' });
    } catch (err) {
        res.status(500).json({ error: 'Error al eliminar producto' });
    }
});

module.exports = router;
