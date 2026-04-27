import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const Booking = () => {
  const { providerId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const distance = location.state?.distance;
  const [provider, setProvider] = useState(null);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProvider = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/providers/${providerId}/`);
        setProvider(response.data);
      } catch (error) {
        console.error("Error fetching provider details", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProvider();
  }, [providerId]);

  const handleBooking = async (e) => {
    e.preventDefault();
    // Simulate booking (normally we would have a logged in user and send to API)
    alert(`Booking confirmed with ${provider.name} on ${date} at ${time}!`);
    navigate('/');
  };

  if (loading) return <div className="text-center mt-5"><div className="spinner-border text-primary"></div></div>;
  if (!provider) return <div className="text-center mt-5">Provider not found</div>;

  return (
    <div className="row justify-content-center mt-4">
      <div className="col-md-6">
        <div className="card shadow-lg border-0 rounded-4">
          <div className="card-header bg-primary text-white p-4 text-center rounded-top-4">
            <h3 className="mb-0">Book {provider.name}</h3>
            <p className="mb-0 text-white-50">{provider.service_type}</p>
          </div>
          <div className="card-body p-4">
            <div className="d-flex justify-content-between mb-4 pb-3 border-bottom">
              <div>
                <h5 className="text-muted mb-1">Price</h5>
                <h3 className="fw-bold">₹{provider.price}/hr</h3>
              </div>
              <div className="text-end">
                <h5 className="text-muted mb-1">Rating</h5>
                <h3 className="text-success fw-bold">★ {provider.rating}</h3>
              </div>
            </div>

            {distance && (
              <div className="alert alert-info py-2 text-center mb-4 border-0 shadow-sm" style={{ backgroundColor: '#e0f2fe', color: '#0369a1' }}>
                <i className="bi bi-geo-alt-fill me-2"></i>
                This provider is <strong>{distance} km</strong> away from your searched location.
              </div>
            )}

            <form onSubmit={handleBooking}>
              <div className="mb-3">
                <label className="form-label fw-bold">Select Date</label>
                <input 
                  type="date" 
                  className="form-control form-control-lg" 
                  required 
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="form-label fw-bold">Select Time</label>
                <input 
                  type="time" 
                  className="form-control form-control-lg" 
                  required 
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary btn-lg w-100 fw-bold shadow-sm">
                Confirm Booking
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
