const express = require('express');
const router = express.Router();
const doctorsController = require('../controllers/doctors');
const validate = require('../utilities/validation');
const utilities = require('../utilities/index');

// Pull Contact Info
router.get('/', doctorsController.getAll); // ALL doctors in the collection
router.get('/:id', doctorsController.getOne); // One doctor in  collection by ID
router.get('/lastname/:lastName', doctorsController.getByName); // one doctor in the collection, by last name (workign on it, not working currently)

// Update Doctor
router.put('/:id', doctorsController.updateDoctor); //  removed validation until I can get the basics working
// Add Doctor
router.post('/', utilities.errorHandler(doctorsController.addDoctor)); //  removed validation until I can get the basics working

// Delete Doctor
router.delete('/:id', doctorsController.removeDoctor);

// Intentional Error for testing
router.get('/example', (req, res, next) => {
  try {
    const data = undefined;
    console.log(data.name);
    throw new Error('Example error');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
