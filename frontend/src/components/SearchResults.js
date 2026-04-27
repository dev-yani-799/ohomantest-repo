import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';

const SearchResults = () => {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('');
  const [availableNow, setAvailableNow] = useState(false);
  
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const serviceType = queryParams.get('service');
  const userLocation = queryParams.get('location');

  const [userCoords, setUserCoords] = useState(null);

  const CITY_COORDINATES = {
    kollam: { lat: 8.8932, lon: 76.6141 },
    trivandrum: { lat: 8.5241, lon: 76.9366 },
    thiruvananthapuram: { lat: 8.5241, lon: 76.9366 },
    kochi: { lat: 9.9312, lon: 76.2673 },
    ernakulam: { lat: 9.9816, lon: 76.2999 },
    thrissur: { lat: 10.5276, lon: 76.2144 },
    kozhikode: { lat: 11.2588, lon: 75.7804 },
    calicut: { lat: 11.2588, lon: 75.7804 },
    kannur: { lat: 11.8745, lon: 75.3704 },
    alappuzha: { lat: 9.4981, lon: 76.3388 },
    kottayam: { lat: 9.5916, lon: 76.5222 },
    palakkad: { lat: 10.7867, lon: 76.6548 },
    malappuram: { lat: 11.0732, lon: 76.0740 },
    kasaragod: { lat: 12.4996, lon: 74.9869 },
    pathanamthitta: { lat: 9.2648, lon: 76.7870 },
    idukki: { lat: 9.8494, lon: 76.9803 },
    wayanad: { lat: 11.6854, lon: 76.1320 },
    hyderabad: { lat: 17.3850, lon: 78.4867 }
  };

  useEffect(() => {
    const normalizedLoc = userLocation ? userLocation.trim().toLowerCase() : 'trivandrum';
    const fallbackCoords = CITY_COORDINATES[normalizedLoc] || CITY_COORDINATES['trivandrum'];

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserCoords({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          });
        },
        (error) => {
          console.warn("Geolocation denied or error, using city center", error);
          setUserCoords(fallbackCoords);
        },
        { timeout: 5000, maximumAge: 0 }
      );
    } else {
      setUserCoords(fallbackCoords);
    }
  }, [userLocation]);

  useEffect(() => {
    if (userCoords) {
      fetchProviders();
    }
  }, [serviceType, sortBy, availableNow, userCoords]);

  const fetchProviders = async () => {
    try {
      setLoading(true);
      let url = `http://localhost:8000/api/providers/search/?service_type=${serviceType}&lat=${userCoords.lat}&lon=${userCoords.lon}`;
      
      if (userLocation) {
        url += `&location=${userLocation}`;
      }
      
      if (sortBy) {
        url += `&sort_by=${sortBy}`;
      }
      if (availableNow) {
        url += `&available_now=true`;
      }

      const token = localStorage.getItem('token');
      const response = await axios.get(url, {
        headers: {
          Authorization: `Token ${token}`
        }
      });
      setProviders(response.data);
    } catch (error) {
      console.error("Error fetching providers", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>{serviceType}s near {userLocation}</h2>
        <div className="d-flex gap-3">
          <div className="form-check form-switch d-flex align-items-center">
            <input 
              className="form-check-input me-2" 
              type="checkbox" 
              role="switch" 
              id="availableSwitch" 
              checked={availableNow}
              onChange={(e) => setAvailableNow(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="availableSwitch">Available Now</label>
          </div>
          <select 
            className="form-select" 
            style={{width: '200px'}}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="rating">Rating (High to Low)</option>
            <option value="distance">Distance (Nearest)</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center mt-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : providers.length > 0 ? (
        <div className="row">
          {providers.map(provider => (
            <div className="col-md-4 mb-4" key={provider.id}>
              <div className="card shadow-sm h-100 border-0 rounded-4">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <h5 className="card-title fw-bold">{provider.name}</h5>
                    <span className="badge bg-success bg-opacity-25 text-success d-flex align-items-center px-2 py-1">
                      ★ {provider.rating}
                    </span>
                  </div>
                  <p className="text-muted mb-2">{provider.service_type}</p>
                  
                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <div className="text-primary fw-bold fs-5">₹{provider.price}/hr</div>
                    <div className="text-muted small">
                      <i className="bi bi-geo-alt"></i> {provider.distance} km away
                    </div>
                  </div>
                </div>
                <div className="card-footer bg-white border-0 pb-3 pt-0">
                  <Link to={`/book/${provider.id}`} state={{ distance: provider.distance }} className="btn btn-outline-primary w-100 fw-bold">
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center mt-5">
          <h4 className="text-muted">No providers found for this service in your area.</h4>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
