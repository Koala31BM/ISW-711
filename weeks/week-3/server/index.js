require('dotenv').config();

const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const path = require('path');

const app = express();

// ========================
// DATABASE CONNECTION
// ========================
const mongoString = process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/todo-api";

mongoose.connect(mongoString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const database = mongoose.connection;

database.on('error', (error) => {
  console.log("Error de conexión:", error);
});

database.once('open', () => {
  console.log('Database Connected');
});

// ========================
// MIDDLEWARE
// ========================
app.use(express.json());

app.use(cors({
  origin: '*',
  methods: "*"
}));

// 🔥 SERVIR CARPETA CLIENT (ESTA ES LA CORRECCIÓN)
app.use(express.static(path.join(__dirname, '../client')));

// ========================
// IMPORT CONTROLLERS
// ========================
const {
  taskPatch,
  taskPost,
  taskGet,
} = require("./controllers/taskController.js");

const {
  courseGet,
  coursePost,
  coursePut,
  courseDelete
} = require("./controllers/courseController.js");

// ========================
// ROUTES
// ========================

// TASK ROUTES
app.get("/api/tasks", taskGet);
app.post("/api/tasks", taskPost);
app.patch("/api/tasks", taskPatch);
app.put("/api/tasks", taskPatch);

// COURSE ROUTES
app.get("/api/courses", courseGet);
app.post("/api/courses", coursePost);
app.put("/api/courses/:id", coursePut);
app.delete("/api/courses/:id", courseDelete);

// ========================
// SERVER
// ========================
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
