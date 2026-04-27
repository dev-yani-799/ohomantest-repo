import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/users/', {
        email,
        password,
        user_type: 'user'
      });
      alert('Signup successful! Please login.');
      navigate('/login');
    } catch (error) {
      console.error(error);
      alert('Signup failed.');
    }
  };

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-md-5">
        <div className="card shadow border-0 rounded-4 p-4">
          <h2 className="text-center mb-4 fw-bold">Create Account</h2>
          <form onSubmit={handleSignup}>
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
            <button type="submit" className="btn btn-primary btn-lg w-100 fw-bold">Sign Up</button>
          </form>
          <div className="text-center mt-4">
            <p className="text-muted">Already have an account? <Link to="/login">Login</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
