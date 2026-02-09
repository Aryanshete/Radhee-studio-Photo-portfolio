
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("./models/User");
const Booking = require("./models/Booking");
const GalleryImage = require("./models/GalleryImage");
const auth = require("./middleware/auth");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./config/cloudinary");


const app = express();
app.use(express.json());

const allowedOrigins = [
  "http://localhost:3000",
  "https://radhee-studio-photo-portfolio.vercel.app",
  "https://radhee-studio-photo-portfolio-mqafhsx7f.vercel.app"
];

app.use(cors({
  origin: true,
  credentials: true
}));



/* ===========================================================
                      MONGO SETUP
=========================================================== */

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("DB error:", err.message);
    process.exit(1);
  });

  //cloudinary storage

  const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "radhee-gallery",
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
  },
});

const upload = multer({ storage });



/* ===========================================================
                      AUTH ROUTES
=========================================================== */

app.post("/api/auth/register", async (req, res) => {
  if (!req.body) {
  return res.status(400).json({ msg: "No request body received" });
}

  try {
    const { name, email, password, role } = req.body;

    let existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ msg: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashed,
      role: role || "customer",
    });

    await user.save();
    res.json({ msg: "User registered", user: { id: user._id, role: user.role } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

app.post("/api/auth/login", async (req, res) => {
  if (!req.body) {
  return res.status(400).json({ msg: "No request body received" });
}

  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    // validate password
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || "supersecret",
      { expiresIn: "7d" }
    );

    res.json({
      msg: "Login successful",
      token,
      role: user.role,
      name: user.name,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

/* ===========================================================
                    BOOKING ROUTES
=========================================================== */

app.post("/api/bookings", async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.json({ msg: "Booking submitted", booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

app.get("/api/bookings", auth("admin"), async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

app.get("/api/bookings/by-email", async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) return res.status(400).json({ msg: "Email required" });

    const bookings = await Booking.find({ email }).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

app.delete("/api/bookings/:id", auth("admin"), async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ msg: "Booking deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

/* ===========================================================
                    GALLERY ROUTES
=========================================================== */

app.get("/api/gallery", async (req, res) => {
  try {
    const { category } = req.query;

    const filter =
      !category || category === "all"
        ? {}
        : { category };

    const images = await GalleryImage.find(filter).sort({ createdAt: -1 });

    res.json(images);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Failed to load gallery" });
  }
});


app.post(
  "/api/gallery",
  auth("admin"),
  upload.array("images", 20),
  async (req, res) => {
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ msg: "No images uploaded" });
      }

      const category = req.body.category || "general";
      
      const saved = [];

      for (const file of req.files) {
        const img = new GalleryImage({
          imageUrl: file.path,
          category,
        });
        await img.save();
        saved.push(img);
      }

      res.json({ msg: "Images uploaded", images: saved });
    } catch (err) {
      console.error("Upload error:", err);
      res.status(500).json({ msg: "Upload failed" });
    }
  }
);

app.get("/api/gallery", async (req, res) => {
  try {
    const { category } = req.query;
    const query = category ? { category } : {};
    const images = await GalleryImage.find(query).sort({ uploadedAt: -1 });
    
    
    
    
    res.json(images);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

app.delete("/api/gallery/:id", auth("admin"), async (req, res) => {
  try {
    const img = await GalleryImage.findById(req.params.id);
    if (!img) return res.status(404).json({ msg: "Image not found" });

    await GalleryImage.findByIdAndDelete(req.params.id);

    res.json({ msg: "Image deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});


/* ===========================================================
                        START SERVER
=========================================================== */

const PORT = process.env.PORT || 8000;
app.listen(PORT, () =>
  console.log(`Server running → http://localhost:${PORT}`)
);
