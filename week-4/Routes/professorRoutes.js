const express = require('express');
const router = express.Router();

const {
  getProfessors,
  createProfessor,
  updateProfessor,
  deleteProfessor
} = require('../controllers/professorController');

router.get('/', getProfessors);
router.post('/', createProfessor);
router.put('/:id', updateProfessor);
router.delete('/:id', deleteProfessor);

module.exports = router;

