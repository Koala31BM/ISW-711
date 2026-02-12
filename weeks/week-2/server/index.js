const express = require('express');
const app = express();

// database connection
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/todo-api");

// IMPORTAR CONTROLADOR DE TASKS (ya existía)
const {
  taskPatch,
  taskPost,
  taskGet,
} = require("./controllers/taskController.js");

// 🆕 IMPORTAR CONTROLADOR DE COURSES
const {
  courseGet,
  coursePost,
  coursePut,
  courseDelete
} = require("./controllers/courseController.js");

// parser
app.use(express.json());

// cors
const cors = require("cors");
app.use(cors({
  origin: '*',
  methods: "*"
}));

// TASK ROUTES (no se tocan)
app.get("/api/tasks", taskGet);
app.post("/api/tasks", taskPost);
app.patch("/api/tasks", taskPatch);
app.put("/api/tasks", taskPatch);

// 🆕 COURSE ROUTES
app.get("/api/courses", courseGet);
app.post("/api/courses", coursePost);
app.put("/api/courses/:id", coursePut);
app.delete("/api/courses/:id", courseDelete);

app.listen(3000, () => console.log(`Example app listening on port 3000!`));
// UPDATE course
app.put("/api/courses/:id", async (req, res) => {
  const updatedCourse = await Course.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updatedCourse);
});

// DELETE course
app.delete("/api/courses/:id", async (req, res) => {
  await Course.findByIdAndDelete(req.params.id);
  res.json({ message: "Course deleted" });
});
