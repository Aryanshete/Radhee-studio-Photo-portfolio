import React, { useState } from "react";
import "./AuthPage.css";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/auth/login`,
        form
      );

      sessionStorage.setItem("token", res.data.token);
      sessionStorage.setItem("role", res.data.role);

      setSuccess(true);

      setTimeout(() => {
        if (res.data.role === "admin") {
          navigate("/admin/dashboard", { replace: true });
          return;
        }
        navigate(from, { replace: true });
      }, 1200);

    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="auth-wrapper login-page">
      <form className="auth-card" onSubmit={handleLogin}>

        <div className="auth-switch">
          <span className="active">Login</span>
          <span onClick={() => navigate("/signup")}>Sign Up</span>
        </div>

        <h2>Welcome Back</h2>
        <p className="sub">Login to continue</p>

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

        <button className="auth-btn">Login</button>
      </form>

      {success && <div className="success-toast">✅ Login successful</div>}
    </div>
  );
}
