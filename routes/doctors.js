const express = require('express');
const router = express.Router();
const doctorsController = require('../controllers/doctors');

// Pull Contact Info
router.get('/', doctorsController.getAll); // ALL doctors in the collection
router.get('/lastname/:lastName', doctorsController.getByName); // one doctor in the collection // workign on it, not working currently

// Add Doctor
router.post('/', doctorsController.addDoctor);

module.exports = router;
