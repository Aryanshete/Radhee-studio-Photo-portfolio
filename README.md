

# 📸 **Radhee Studio – Photography Website**

A full-stack photography booking and gallery management web application built with **React (frontend)** and **Node.js + Express + MongoDB (backend)**.
Includes **customer booking**, **gallery display**, **admin dashboard**, **image uploads**, and **authentication**.

---

## 🚀 **Features**

### **🌟 Client Website**

* Modern photography website UI
* Custom services section
* Interactive animated hero section
* Fully functional gallery (fetched from backend)
* Custom cursor + premium UI design
* Smooth navigation and mobile responsiveness
* Booking form (Name, Email, Phone, Date, Service, Message)

### **👤 Customer**

* Customer login
* Book a session
* View confirmation message
* Logout
* Pages accessible only when logged in

### **🛠 Admin**

* Admin Dashboard
* View all customer bookings
* Delete bookings
* Upload images to gallery
* Auto-crop images (Square)
* Manage gallery by category
* Delete gallery images
* Admin authentication with JWT

---

# 📁 **Project Structure**

```
Radhee-Studio/
│
├── backend/
│   ├── server.js
│   ├── config/
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── middleware/
│   ├── uploads/ (image uploads)
│   ├── node_modules/
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.js
│   │   ├── index.js
│   │   ├── assets/
│   │   └── styles/
│   ├── public/
│   ├── package.json
│   └── node_modules/
│
└── README.md
```

---

# 🛠 **Required Software**

Install these before starting the project:

### **1. Node.js**

Download from:
[https://nodejs.org/](https://nodejs.org/)

### **2. MongoDB**

Either install locally OR use **MongoDB Atlas** (cloud DB).
[https://www.mongodb.com/atlas/database](https://www.mongodb.com/atlas/database)

---

# 📦 **Backend – Required Libraries**

Run inside **backend/**:

```sh
npm install express mongoose cors bcryptjs jsonwebtoken multer morgan dotenv
```

### **Dev dependencies**

```sh
npm install --save-dev nodemon
```

---

# 🎨 **Frontend – Required Libraries**

Run inside **frontend/**:

```sh
npm install axios react-router-dom
```

If using icons:

```sh
npm install react-icons
```

---

# 🔧 **Environment Variables (.env)**

Create a **.env** file inside `/backend`:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

---

# ▶️ **How to Start the Project**

## **1️⃣ Start Backend**

Open terminal:

```sh
cd backend
node server.js
```

Server runs at:

```
http://localhost:5000
```

---

## **2️⃣ Start Frontend**

Open another terminal:

```sh
cd frontend
npm install
npm start
```

Frontend runs at:

```
http://localhost:3000
```

---

# 🔗 **API Endpoints (Backend)**

## **Authentication**

| Method | Endpoint           | Description    |
| ------ | ------------------ | -------------- |
| POST   | `/api/auth/login`  | Customer login |
| POST   | `/api/admin/login` | Admin login    |

---

## **Bookings**

| Method | Endpoint            | Description             |
| ------ | ------------------- | ----------------------- |
| POST   | `/api/bookings`     | Create a booking        |
| GET    | `/api/bookings`     | Admin: Get all bookings |
| DELETE | `/api/bookings/:id` | Admin: Delete a booking |

---

## **Gallery**

| Method | Endpoint                        | Description    |
| ------ | ------------------------------- | -------------- |
| POST   | `/api/gallery`                  | Upload images  |
| GET    | `/api/gallery`                  | Get all images |
| GET    | `/api/gallery?category=wedding` | Filter images  |
| DELETE | `/api/gallery/:id`              | Delete image   |

---

# 🔐 **Role System**

### **Customer Role**

* Can login
* Can book a session
* Navbar changes when logged in
* Logout available

### **Admin Role**

* Can login via `/admin/login`
* Access admin dashboard
* Manage bookings
* Upload gallery images
* Delete gallery images

---

# ✨ **UI/UX Enhancements**

* Premium gold color palette
* Smooth hover effects
* Box shadows & gradients
* Animated gallery
* Mobile responsive navbar
* Custom animated cursor
* Square auto-crop for images

---

# 👨‍💻 **Commands Summary**


### **Frontend**

```sh
npm start
```

### **Backend**

```sh
node server.js
```

---

# 📄 **License**

This project is proprietary and owned by **Radhee Studio**.
Not allowed for redistribution without permission.

---

# ❤️ **Credits**

Developed by **Sahil S.**
With assistance from AI-powered development workflows.

---

