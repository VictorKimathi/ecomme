import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductManagement.css';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', price: '', description: '' });
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    // Fetch initial product list
    const fetchProducts = async () => {
      const response = await axios.get('/api/products');
      setProducts(response.data);
    };
    fetchProducts();
  }, []);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddProduct = async () => {
    try {
      const response = await axios.post('/api/products', form);
      setProducts([...products, response.data]);
      setForm({ name: '', price: '', description: '' });
    } catch (error) {
      console.error('Error adding product', error);
    }
  };

  const handleUpdateProduct = async () => {
    try {
      const response = await axios.put(`/api/products/${editing.id}`, form);
      setProducts(products.map(p => p.id === editing.id ? response.data : p));
      setEditing(null);
      setForm({ name: '', price: '', description: '' });
    } catch (error) {
      console.error('Error updating product', error);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`/api/products/${id}`);
      setProducts(products.filter(p => p.id !== id));
    } catch (error) {
      console.error('Error deleting product', error);
    }
  };

  return (
    <div className="product-management">
      <h2>Product Management</h2>
      <div className="form-container">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleInputChange}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleInputChange}
        ></textarea>
        {editing ? (
          <button onClick={handleUpdateProduct}>Update Product</button>
        ) : (
          <button onClick={handleAddProduct}>Add Product</button>
        )}
      </div>
      <div className="product-list">
        {products.map(product => (
          <div key={product.id} className="product-item">
            <h4>{product.name}</h4>
            <p>{product.description}</p>
            <p>${product.price}</p>
            <button onClick={() => {
              setForm({
                name: product.name,
                price: product.price,
                description: product.description
              });
              setEditing(product);
            }}>
              Edit
            </button>
            <button onClick={() => handleDeleteProduct(product.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductManagement;
