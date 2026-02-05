import React, { useState } from "react";
import "./AuthPage.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
        await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/auth/register`,
        {
            name: form.email.split("@")[0],   
            email: form.email,
            password: form.password
        }
        );

      setSuccess(true);

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err) {
      setError(err.response?.data?.msg || "Signup failed");
    }
  };

  return (
    <div className="auth-wrapper signup-page">
      <form className="auth-card" onSubmit={handleSignup}>

        <div className="auth-switch">
          <span onClick={() => navigate("/login")}>Login</span>
          <span className="active">Sign Up</span>
        </div>

        <h2>Create Account</h2>
        <p className="sub">Sign up to continue</p>

        {error && <div className="error-box">{error}</div>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          onChange={handleChange}
          required
        />

        <button className="auth-btn">Sign Up</button>
      </form>

      {success && <div className="success-toast">🎉 Account created</div>}
    </div>
  );
}
