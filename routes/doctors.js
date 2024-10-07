const express = require('express');
const router = express.Router();
const doctorsController = require('../controllers/doctors');
const validate = require('../utilities/validation');
const utilities = require('../utilities/index');

// Pull Contact Info
router.get('/', doctorsController.getAll); // ALL doctors in the collection
router.get('/:id', doctorsController.getOne); // One doctor in  collection by ID
router.get('/lastname/:lastName', doctorsController.getByName); // one doctor in the collection, by last name (workign on it, not working currently)

// Add Doctor
router.post(
  '/',
  validate.createDoctorRules(),
  validate.checkValidation,
  utilities.errorHandler(doctorsController.addDoctor)
);

// Update Doctor
router.put(
  '/:id',
  validate.updateDoctorRules(),
  validate.checkValidation,
  utilities.errorHandler(doctorsController.updateDoctor)
);

// Delete Doctor
router.delete('/:id', utilities.errorHandler(doctorsController.removeDoctor));

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
