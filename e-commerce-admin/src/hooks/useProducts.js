import { useState, useEffect } from 'react';

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const url = 'http://localhost:3001/products';

  // GET: Read data
  useEffect(() => {
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // POST: Create new product
  const addProduct = async (newProduct) => {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct),
    });
    const data = await res.json();
    setProducts([...products, data]); // Update state without refreshing
  };

  // PATCH: Update product price
  const updateProductPrice = async (id, newPrice) => {
    const res = await fetch(`${url}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ price: parseFloat(newPrice) }),
    });
    const updatedProduct = await res.json();
    
    // Update local state
    setProducts(products.map(p => p.id === id ? updatedProduct : p));
  };

  return { products, loading, error, addProduct, updateProductPrice };
}