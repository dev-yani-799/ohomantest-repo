import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home';
import SearchResults from './components/SearchResults';
import Booking from './components/Booking';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  const token = localStorage.getItem('token');
  const userEmail = localStorage.getItem('userEmail');
  const userType = localStorage.getItem('userType');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userType');
    window.location.href = '/login';
  };

  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
        <div className="container">
          <Link className="navbar-brand font-weight-bold" to="/">ServiceHub</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ms-auto align-items-center">
              {token ? (
                <>
                  <li className="nav-item me-3 text-light">
                    Welcome, <strong>{userEmail}</strong>
                  </li>
                  <li className="nav-item">
                    <button onClick={handleLogout} className="btn btn-sm btn-outline-light">Logout</button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/signup">Sign Up</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/book/:providerId" element={<Booking />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
