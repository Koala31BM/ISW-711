const Course = require('../models/coursemodel.js');

// ==========================
// GET ALL COURSES
// ==========================
const courseGet = async (req, res) => {
  try {
    const courses = await Course.find();
    console.log("Cursos encontrados:", courses);
    res.status(200).json(courses);
  } catch (error) {
    console.log("ERROR GET:", error);
    res.status(500).json({ error: error.message });
  }
};

// ==========================
// POST CREATE COURSE
// ==========================
const coursePost = async (req, res) => {
  try {
    console.log("BODY RECIBIDO:", req.body);

    const { name, credits } = req.body;

    const newCourse = new Course({
      name: name,
      credits: Number(credits)
    });

    await newCourse.save();

    console.log("CURSO GUARDADO:", newCourse);

    res.status(201).json(newCourse);

  } catch (error) {
    console.log("ERROR POST:", error);
    res.status(400).json({ error: error.message });
  }
};

// ==========================
// PUT UPDATE COURSE
// ==========================
const coursePut = async (req, res) => {
  try {
    const { name, credits } = req.body;

    const updated = await Course.findByIdAndUpdate(
      req.params.id,
      { name, credits: Number(credits) },
      { new: true }
    );

    console.log("CURSO ACTUALIZADO:", updated);

    res.status(200).json(updated);

  } catch (error) {
    console.log("ERROR PUT:", error);
    res.status(400).json({ error: error.message });
  }
};

// ==========================
// DELETE COURSE
// ==========================
const courseDelete = async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);

    console.log("CURSO ELIMINADO:", req.params.id);

    res.status(200).json({ message: "Course deleted" });

  } catch (error) {
    console.log("ERROR DELETE:", error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = { courseGet, coursePost, coursePut, courseDelete };
