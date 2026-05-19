import React, { useState } from 'react';
import { useProducts } from '../hooks/useProducts';

export default function ProductDashboard() {
  const { products, loading, error, updateProductPrice, deleteProduct } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [newPrices, setNewPrices] = useState({}); // Stores price inputs by product ID

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>Error loading products: {error}</div>;

  // Dynamically filter products based on user search
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePriceChange = (id, value) => {
    setNewPrices({ ...newPrices, [id]: value });
  };

  const handleUpdate = (id) => {
    if (newPrices[id]) {
      updateProductPrice(id, newPrices[id]);
      setNewPrices({ ...newPrices, [id]: '' }); // Clear input after update
    }
  };

  return (
    <div>
      <h2>Product Dashboard</h2>
      
      {/* Search Functionality */}
      <input
        type="text"
        placeholder="Search for a product..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ padding: '0.5rem', marginBottom: '1rem', width: '100%', maxWidth: '300px' }}
      />

      {/* Product List */}
      <div style={{ display: 'grid', gap: '1rem' }}>
        {filteredProducts.map((product) => (
  <div key={product.id} style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}>
    <h3>{product.name}</h3>
    <p><strong>Description:</strong> {product.description}</p>
    <p><strong>Origin:</strong> {product.origin}</p>
    <p><strong>Current Price:</strong> ${parseFloat(product.price).toFixed(2)}</p>
    
    {/* Admin Price Update */}
    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
      <input
        type="number"
        step="0.01"
        placeholder="New Price"
        value={newPrices[product.id] || ''}
        onChange={(e) => handlePriceChange(product.id, e.target.value)}
      />
      <button onClick={() => handleUpdate(product.id)}>Update Price</button>
      <button 
        onClick={() => {
          if (window.confirm(`Delete ${product.name}?`)) {
            deleteProduct(product.id);
          }
        }}
        style={{ backgroundColor: '#ff6b6b', color: 'white' }}
      >
        Delete
      </button>
    </div>
  </div>
))}
        ))}
        {filteredProducts.length === 0 && <p>No products found.</p>}
      </div>
    </div>
  );
}
