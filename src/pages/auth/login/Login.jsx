import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Import the CSS file

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // Default role
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();   
    // Simulating role-based redirection
    // Redirect based on role
    if (role === 'storemanager') {
      setRole('storemanager')
      navigate('/product-management');
    } else if (role === 'salesperson') {
      setRole('salesperson')

      navigate('/order-management');
    } else {
      navigate('/home'); // Normal user
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="role-selection">
            <label>
              <input
                type="radio"
                name="role"
                value="user"
                checked={role === 'user'}
                onChange={() => setRole('user')}
              />
              User
            </label>
            <label>
              <input
                type="radio"
                name="role"
                value="salesperson"
                checked={role === 'salesperson'}
                onChange={() => setRole('salesperson')}
              />
              Salesperson
            </label>
            <label>
              <input
                type="radio"
                name="role"
                value="storemanager"
                checked={role === 'storemanager'}
                onChange={() => setRole('storemanager')}
              />
              Store Manager
            </label>
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
