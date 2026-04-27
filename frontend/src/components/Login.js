import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/api-token-auth/', {
        username: email,
        password: password
      });
      if (res.data.user_type === 'provider') {
        alert('Provider accounts cannot log in to the customer portal.');
        return;
      }

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userEmail', res.data.email);
      localStorage.setItem('userType', res.data.user_type);
      alert('Logged in successfully!');
      window.location.href = '/';
    } catch (err) {
      console.error(err);
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-md-5">
        <div className="card shadow border-0 rounded-4 p-4">
          <h2 className="text-center mb-4 fw-bold">Welcome Back</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input 
                type="email" 
                className="form-control form-control-lg" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="form-label">Password</label>
              <input 
                type="password" 
                className="form-control form-control-lg" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary btn-lg w-100 fw-bold">Login</button>
          </form>
          <div className="text-center mt-4">
            <p className="text-muted">Don't have an account? <Link to="/signup">Sign up</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
