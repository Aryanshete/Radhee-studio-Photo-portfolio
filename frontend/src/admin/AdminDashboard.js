import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminDashboard.css";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [gallery, setGallery] = useState([]);

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [category, setCategory] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);

  const [activeTab, setActiveTab] = useState("bookings");
  const [galleryFilter, setGalleryFilter] = useState("all");

  const token = sessionStorage.getItem("token");
  const role = sessionStorage.getItem("role");

  useEffect(() => {
    if (!token || role !== "admin") {
      navigate("/admin/login");
    }
  }, [token, role, navigate]);

  const authHeaders = { "x-auth-token": token };

  const loadBookings = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/bookings`, {
        headers: authHeaders,
      });
      setBookings(res.data);
    } catch (err) {
      console.error("Booking load error:", err);
    }
  };

  const loadGallery = async (cat = galleryFilter) => {
    try {
      const q =
        !cat || cat === "all" ? "" : `?category=${encodeURIComponent(cat)}`;

      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/gallery${q}`);
      setGallery(res.data);
    } catch (err) {
      console.error("Gallery load error:", err);
    }
  };

  useEffect(() => {
    loadBookings();
    loadGallery();
  }, []);

  useEffect(() => {
    loadGallery(galleryFilter);
  }, [galleryFilter]);

  const deleteBooking = async (id) => {
    if (!window.confirm("Delete this booking?")) return;
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/bookings/${id}`, {
        headers: authHeaders,
      });
      loadBookings();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteImage = async (id) => {
    if (!window.confirm("Delete this image?")) return;
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/gallery/${id}`, {
        headers: authHeaders,
      });
      loadGallery();
    } catch (err) {
      console.error(err);
    }
  };

  const handleFiles = (files) => {
    const arr = Array.from(files || []);
    if (!arr.length) return;

    setSelectedFiles(arr);
    setPreviews(arr.map((file) => URL.createObjectURL(file)));
  };

  const onDrop = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };
  const onDragOver = (e) => e.preventDefault();

  const autoCropSquare = (i) => {
    const file = selectedFiles[i];
    if (!file) return;

    const img = new Image();
    const url = URL.createObjectURL(file);
    img.src = url;

    img.onload = () => {
      const side = Math.min(img.width, img.height);
      const sx = (img.width - side) / 2;
      const sy = (img.height - side) / 2;

      const canvas = document.createElement("canvas");
      canvas.width = side;
      canvas.height = side;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, sx, sy, side, side, 0, 0, side, side);

      canvas.toBlob(
        (blob) => {
          const cropped = new File([blob], file.name, {
            type: file.type,
            lastModified: Date.now(),
          });

          const newFiles = [...selectedFiles];
          newFiles[i] = cropped;
          setSelectedFiles(newFiles);

          const newPreviews = [...previews];
          newPreviews[i] = URL.createObjectURL(cropped);
          setPreviews(newPreviews);
        },
        file.type,
        0.95
      );
    };
  };

  const uploadImages = async () => {
    if (!selectedFiles.length || !category)
      return alert("Please select images and a category");

    const fd = new FormData();
    selectedFiles.forEach((file) => fd.append("images", file));
    fd.append("category", category);

    try {
      setUploadProgress(0);

      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/gallery`, fd, {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-auth-token": token,
        },
        onUploadProgress: (e) => {
          if (!e.total) return;
          setUploadProgress(Math.round((e.loaded * 100) / e.total));
        },
      });

      setSelectedFiles([]);
      setPreviews([]);
      setCategory("");

      loadGallery();
      alert("Upload Successful!");
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
    navigate("/admin/login");
  };

  const categories = [
    { id: "all", label: "All" },
    { id: "wedding", label: "Wedding" },
    { id: "prewedding", label: "Pre-Wedding" },
    { id: "portraits", label: "Portraits" },
    { id: "studio", label: "Studio" },
    { id: "family", label: "Family" },
    { id: "corporate", label: "Corporate" },
    { id: "commercial", label: "Commercial" },
  ];

  return (
    <div className="admin-layout">

      {/* =============== SIDEBAR =============== */}
      <aside className="admin-sidebar">
        <h2>Admin Panel</h2>

        <button
          className={activeTab === "bookings" ? "active" : ""}
          onClick={() => setActiveTab("bookings")}
        >
          Bookings
        </button>

        <button
          className={activeTab === "gallery" ? "active" : ""}
          onClick={() => setActiveTab("gallery")}
        >
          Gallery
        </button>

        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </aside>

      {/* =============== MAIN CONTENT =============== */}
      <main className="admin-main">

        {/* ------------------ BOOKINGS TAB ------------------ */}
        {activeTab === "bookings" && (
          <section>
            <h2 className="section-title">Customer Bookings</h2>

            <div className="booking-list">
              {bookings.length === 0 && <p>No bookings yet.</p>}

              {bookings.map((b) => (
                <div key={b._id} className="booking-card">

                  <div>
                    <p className="booking-name">
                      {b.name}  
                      <span className="booking-service"> — {b.serviceType}</span>
                    </p>

                    <p className="booking-meta">
                      {b.date} • {b.phone} • {b.email}
                    </p>

                    {b.message && (
                      <p className="booking-message">“{b.message}”</p>
                    )}
                  </div>

                  <button
                    className="delete-btn"
                    onClick={() => deleteBooking(b._id)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ------------------ GALLERY TAB ------------------ */}
        {activeTab === "gallery" && (
          <section>
            <h2 className="section-title">Gallery Manager</h2>

            <div className="gallery-container">

              {/* CATEGORY FILTER */}
              <div className="gallery-category-box">
                <h3>Categories</h3>

                {categories.map((c) => (
                  <button
                    key={c.id}
                    className={
                      galleryFilter === c.id ? "cat-btn active" : "cat-btn"
                    }
                    onClick={() => setGalleryFilter(c.id)}
                  >
                    {c.label}
                  </button>
                ))}
              </div>

              {/* IMAGE UPLOAD + VIEW */}
              <div className="gallery-right">

                {/* Upload Box */}
                <div className="upload-box">
                  <h3>Upload Images</h3>

                  <div
                    className="dropzone"
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                  >
                    Drag & Drop images or Click to select
                  </div>

                  <input type="file" multiple accept="image/*" onChange={(e) => handleFiles(e.target.files)} />

                  <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="">Select Category</option>
                    {categories.filter((c) => c.id !== "all").map((c) => (
                      <option key={c.id} value={c.id}>{c.label}</option>
                    ))}
                  </select>

                  {/* Preview */}
                  {previews.length > 0 && (
                    <div className="preview-grid">
                      {previews.map((src, i) => (
                        <div className="preview-card" key={i}>
                          <img src={src} alt="" />
                          <button
                            className="crop-btn"
                            onClick={() => autoCropSquare(i)}
                          >
                            Crop Square
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {uploadProgress > 0 && (
                    <div className="progress">
                      <div className="progress-fill" style={{ width: `${uploadProgress}%` }}></div>
                    </div>
                  )}

                  <button className="upload-btn" onClick={uploadImages}>
                    Upload
                  </button>
                </div>

                {/* GALLERY GRID */}
                <div className="gallery-grid">
                  {gallery.length === 0 && <p>No images found.</p>}

                  {gallery.map((g) => (
                    <div key={g._id} className="gallery-item">
                      <img src={g.imageUrl} alt="" />

                      <div className="gallery-info">
                        <span>{g.category}</span>

                        <button
                          className="delete-btn"
                          onClick={() => deleteImage(g._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
