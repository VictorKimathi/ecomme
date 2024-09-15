import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './OrderManagement.css';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', address: '' });
  const [editing, setEditing] = useState(null);
  const [status, setStatus] = useState(''); // State for order status

  useEffect(() => {
    // Fetch initial data
    const fetchOrders = async () => {
      const response = await axios.get('/api/orders');
      setOrders(response.data);
    };
    const fetchCustomers = async () => {
      const response = await axios.get('/api/customers');
      setCustomers(response.data);
    };
    fetchOrders();
    fetchCustomers();
  }, []);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddCustomer = async () => {
    try {
      const response = await axios.post('/api/customers', form);
      setCustomers([...customers, response.data]);
      setForm({ name: '', email: '', address: '' });
    } catch (error) {
      console.error('Error adding customer', error);
    }
  };

  const handleUpdateCustomer = async () => {
    try {
      const response = await axios.put(`/api/customers/${editing.id}`, form);
      setCustomers(customers.map(c => c.id === editing.id ? response.data : c));
      setEditing(null);
      setForm({ name: '', email: '', address: '' });
    } catch (error) {
      console.error('Error updating customer', error);
    }
  };

  const handleDeleteCustomer = async (id) => {
    try {
      await axios.delete(`/api/customers/${id}`);
      setCustomers(customers.filter(c => c.id !== id));
    } catch (error) {
      console.error('Error deleting customer', error);
    }
  };

  const handleOrderUpdate = async (orderId) => {
    try {
      // Update order status
      const response = await axios.put(`/api/orders/${orderId}`, { status });
      setOrders(orders.map(o => o.id === orderId ? response.data : o));
    } catch (error) {
      console.error('Error updating order status', error);
    }
  };

  return (
    <div className="order-management">
      <h2>Order Management</h2>
      <div className="form-container">
        <input
          type="text"
          name="name"
          placeholder="Customer Name"
          value={form.name}
          onChange={handleInputChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Customer Email"
          value={form.email}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Customer Address"
          value={form.address}
          onChange={handleInputChange}
        />
        {editing ? (
          <button onClick={handleUpdateCustomer}>Update Customer</button>
        ) : (
          <button onClick={handleAddCustomer}>Add Customer</button>
        )}
      </div>
      <div className="customer-list">
        {customers.map(customer => (
          <div key={customer.id} className="customer-item">
            <h4>{customer.name}</h4>
            <p>{customer.email}</p>
            <p>{customer.address}</p>
            <button onClick={() => {
              setForm({
                name: customer.name,
                email: customer.email,
                address: customer.address
              });
              setEditing(customer);
            }}>
              Edit
            </button>
            <button onClick={() => handleDeleteCustomer(customer.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
      <div className="order-list">
        <h3>Orders</h3>
        {orders.map(order => (
          <div key={order.id} className="order-item">
            <h4>Order ID: {order.id}</h4>
            <p>Customer: {order.customerName}</p>
            <p>Status: {order.status}</p>
            <input
              type="text"
              placeholder="New Status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            />
            <button onClick={() => handleOrderUpdate(order.id)}>Update Status</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderManagement;
