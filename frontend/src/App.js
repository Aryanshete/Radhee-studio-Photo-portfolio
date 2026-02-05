import React from "react";
import "./App.css";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Owner from "./components/Owner";
import Services from "./components/Services";
import Gallery from "./components/Gallery";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import SignupPage from "./components/SignupPage";
import ProtectedRoute from "./ProtectedRoute";
import LoginPage from "./components/LoginPage";
import BookingForm from "./components/BookingForm";
import AdminDashboard from "./admin/AdminDashboard";
import CustomerBookings from "./components/CustomerBookings";

export default function App() {
  const location = useLocation();
  const role = sessionStorage.getItem("role");


  const hideNavbarPaths = ["/admin/dashboard"];
  const hideNavbar = hideNavbarPaths.includes(location.pathname);

  return (
    <div className="App">
      <CustomCursor />

      {/* Show navbar only for customer pages */}
      {!hideNavbar && <Navbar />}

      <Routes>
        {/* DEFAULT REDIRECT TO HOME */}
        <Route path="/" element={<Navigate to="/home" />} />

        {/* AUTH PAGES */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* ADMIN DASHBOARD  */}
        <Route
          path="/admin/dashboard"
          element={
            role === "admin" ? <AdminDashboard /> : <Navigate to="/login" />
          }
        />

        {/* PUBLIC HOME PAGE */}
        <Route
          path="/home"
          element={
            <>
              <Hero />
              <Gallery />
              <Services />
              <Owner />
              <Footer />
            </>
          }
        />

        {/* CUSTOMER BOOKINGS PAGE */}
        <Route
          path="/customer/bookings"
          element={
            role === "customer" ? (
              <CustomerBookings />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* BOOKING PAGE — LOGIN REQUIRED */}
        <Route
          path="/book"
          element={
            <ProtectedRoute>
              <BookingForm />
            </ProtectedRoute>
          }
        />

        {/* CATCH-ALL */}
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </div>
  );
}
