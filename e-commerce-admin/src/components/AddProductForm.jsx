import React, { useState } from 'react';
import { useProducts } from '../hooks/useProducts';

export default function AddProductForm() {
  const { addProduct } = useProducts();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    origin: '',
    price: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Format the new product object
    const newProduct = {
      ...formData,
      price: parseFloat(formData.price) // Ensure price is stored as a number
    };

    addProduct(newProduct);
    alert('Product added successfully!');
    
    // Clear form
    setFormData({ name: '', description: '', origin: '', price: '' });
  };

  return (
    <div style={{ maxWidth: '400px' }}>
      <h2>Add a New Product</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input required type="text" name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} />
        <input required type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
        <input required type="text" name="origin" placeholder="Origin" value={formData.origin} onChange={handleChange} />
        <input required type="number" step="0.01" name="price" placeholder="Price" value={formData.price} onChange={handleChange} />
        <button type="submit" style={{ padding: '0.5rem', cursor: 'pointer' }}>Add Product</button>
      </form>
    </div>
  );
}