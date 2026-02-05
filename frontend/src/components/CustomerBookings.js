import React, { useEffect, useState } from "react";
import axios from "axios";
import "./BookingForm.css";
import { useNavigate } from "react-router-dom";

export default function CustomerBookings() {
  const [bookings, setBookings] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();
  const email = localStorage.getItem("customerEmail");

  useEffect(() => {
    if (!email) {
      navigate("/customer/login");
      return;
    }

    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/bookings/by-email`, {
        params: { email },
      })
      .then((res) => {
        setBookings(res.data);
        setLoaded(true);
      });
  }, [email, navigate]);

  return (
    <div className="booking-container">
      <h2>Your Bookings</h2>
      <p className="subtitle">{email}</p>

      {!loaded && <p>Loading...</p>}

      {loaded && bookings.length === 0 && (
        <p>No bookings found for this email.</p>
      )}

      {bookings.map((b) => (
        <div key={b._id} className="success-box" style={{ marginBottom: 10 }}>
          <strong>{b.serviceType}</strong> on {b.date}
          <br />
          Status: <span>Pending (studio will confirm)</span>
          {b.message && (
            <>
              <br />
              Your note: “{b.message}”
            </>
          )}
        </div>
      ))}
    </div>
  );
}
