const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    category: { type: String, enum: ['bebidas', 'alimentos', 'otros'], required: true },
    quantity: { type: Number, required: true, min: 0 },
    price: { type: Number, required: true },
    expirationDate: { type: Date },
    createdAt: { type: Date, default: Date.now }
});

// Índices para mejorar consultas
productSchema.index({ category: 1 });
productSchema.index({ name: 1 });

module.exports = mongoose.model('Product', productSchema);
