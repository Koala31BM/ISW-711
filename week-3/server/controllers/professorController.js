const Professor = require('../models/professorModel');


// GET ALL PROFESSORS

const professorGet = async (req, res) => {
  try {
    const professors = await Professor.find();
    res.status(200).json(professors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// CREATE PROFESSOR

const professorPost = async (req, res) => {
  try {
    const professor = new Professor(req.body);
    const savedProfessor = await professor.save();
    res.status(201).json(savedProfessor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// UPDATE PROFESSOR

const professorPut = async (req, res) => {
  try {
    const updated = await Professor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Professor not found" });
    }

    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const professorDelete = async (req, res) => {
  try {
    const deleted = await Professor.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Professor not found" });
    }

    res.status(200).json({ message: "Professor deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  professorGet,
  professorPost,
  professorPut,
  professorDelete
};
