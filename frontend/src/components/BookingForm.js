import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./BookingForm.css";

export default function BookingForm() {
  const location = useLocation();

  const selectedService = location.state?.serviceName || "";

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    message: "",
    serviceType: selectedService,
  });

  useEffect(() => {
    if (selectedService) {
      setForm((prev) => ({ ...prev, serviceType: selectedService }));
    }
  }, [selectedService]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitBooking = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/bookings`, form);
      alert("Booking submitted successfully!");
    } catch (err) {
      console.error(err);
      alert("Error submitting booking!");
    }
  };

  return (
    <div className="booking-page">
      <div className="booking-container">
        <h2>Book Your Session</h2>

        <form onSubmit={submitBooking} className="booking-form">
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="Your full name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Your email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <label>Phone</label>
          <input
            type="tel"
            name="phone"
            placeholder="Your phone number"
            value={form.phone}
            onChange={handleChange}
            required
          />

          <label>Date</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
          />

          <label>Choose Service</label>
          <select
            name="serviceType"
            value={form.serviceType}
            onChange={handleChange}
            required
          >
            <option value="">Select a service</option>
            <option value="Wedding Stories">Wedding Stories</option>
            <option value="Pre-Wedding">Pre-Wedding</option>
            <option value="Portraits">Portraits</option>
            <option value="Family Sessions">Family Sessions</option>
            <option value="Corporate">Corporate</option>
            <option value="Commercial & Branding">
              Commercial & Branding
            </option>
          </select>

          <label>Message (Optional)</label>
          <textarea
            name="message"
            placeholder="Any special requests?"
            value={form.message}
            onChange={handleChange}
          />

          <button type="submit" className="submit-btn">
            Submit Booking
          </button>
        </form>
      </div>
    </div>
  );
}
