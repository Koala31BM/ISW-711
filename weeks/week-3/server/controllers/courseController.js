const Course = require('../models/courseModel');

// GET all courses
const courseGet = async (req, res) => {
  try {
    const courses = await Course.find().populate('professorId');
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST create course
const coursePost = async (req, res) => {
  try {
    const { name, code, description, professorId } = req.body;

    const course = new Course({
      name,
      code,
      description,
      professorId
    });

    const savedCourse = await course.save();
    res.status(201).json(savedCourse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// PUT update course
const coursePut = async (req, res) => {
  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json(updatedCourse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE course
const courseDelete = async (req, res) => {
  try {
    const deletedCourse = await Course.findByIdAndDelete(req.params.id);

    if (!deletedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  courseGet,
  coursePost,
  coursePut,
  courseDelete
};
