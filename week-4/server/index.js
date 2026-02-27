require('dotenv').config();

const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const path = require('path');
const authRoutes = require("./routes/authRoutes");
app.use(authRoutes);
const app = express();

// ========================
// DATABASE CONNECTION
// ========================
const mongoString = process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/school-api";

mongoose.connect(mongoString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log("Error de conexión:", err));

// ========================
// MIDDLEWARE
// ========================
app.use(express.json());

app.use(cors({
  origin: '*',
  methods: "*"
}));

// Servir frontend
app.use(express.static(path.join(__dirname, '../client')));

// ========================
// IMPORT CONTROLLERS
// ========================
const {
  courseGet,
  coursePost,
  coursePut,
  courseDelete
} = require("./controllers/courseController");

const {
  professorGet,
  professorPost,
  professorPut,
  professorDelete
} = require("./controllers/professorController");

// ========================
// ROUTES
// ========================

// ===== PROFESSOR ROUTES =====
app.get("/api/professors", professorGet);
app.post("/api/professors", professorPost);
app.put("/api/professors/:id", professorPut);
app.delete("/api/professors/:id", professorDelete);

// ===== COURSE ROUTES =====
app.get("/api/courses", courseGet);
app.post("/api/courses", coursePost);
app.put("/api/courses/:id", coursePut);
app.delete("/api/courses/:id", courseDelete);

// ========================
// SERVER
// ========================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

console.log("courseGet:", courseGet);
console.log("professorGet:", professorGet);
