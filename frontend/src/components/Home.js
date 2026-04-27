import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [location, setLocation] = useState('');
  const [service, setService] = useState('Electrician');
  const navigate = useNavigate();

  const VALID_CITIES = [
    'kollam', 'trivandrum', 'thiruvananthapuram', 'kochi', 'ernakulam',
    'thrissur', 'kozhikode', 'calicut', 'kannur', 'alappuzha', 'kottayam',
    'palakkad', 'malappuram', 'kasaragod', 'pathanamthitta', 'idukki', 'wayanad',
    'hyderabad'
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (!localStorage.getItem('token')) {
      alert("Please login first to search for service providers.");
      navigate('/login');
      return;
    }
    if (!location) {
      alert("Please enter a location");
      return;
    }
    const normalizedLocation = location.trim().toLowerCase();
    if (!VALID_CITIES.includes(normalizedLocation)) {
      alert("please enter city name correctly");
      return;
    }
    navigate(`/search?service=${service}&location=${location}`);
  };

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-md-8 text-center">
        <h1 className="display-4 fw-bold mb-4">Find Local Professionals</h1>
        <p className="lead mb-5 text-muted">Book electricians, plumbers, cleaners and more instantly.</p>

        <div className="card shadow-lg border-0 rounded-4 p-4">
          <form onSubmit={handleSearch} className="row g-3 align-items-center">
            <div className="col-md-5">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Enter your location (e.g., Trivandrum)"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <select
                className="form-select form-select-lg"
                value={service}
                onChange={(e) => setService(e.target.value)}
              >
                <option value="Electrician">Electrician</option>
                <option value="Plumber">Plumber</option>
                <option value="Cleaning">Cleaning</option>
                <option value="Carpenter">Carpenter</option>
                <option value="Painter">Painter</option>
              </select>
            </div>
            <div className="col-md-3">
              <button type="submit" className="btn btn-primary btn-lg w-100 fw-bold">Search</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
