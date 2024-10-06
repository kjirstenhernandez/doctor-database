const express = require('express');
const router = express.Router();
const doctorsController = require('../controllers/doctors');
const validate = require('../utilities/validation');
const utilities = require('../utilities/index');

// Pull Contact Info
router.get('/', doctorsController.getAll); // ALL doctors in the collection
router.get('/:id', doctorsController.getOne); // ALL doctors in the collection
router.get('/lastname/:lastName', doctorsController.getByName); // one doctor in the collection // workign on it, not working currently

// Add Doctor
router.post('/', validate.createDoctorRules(), utilities.errorHandler(doctorsController.addDoctor));

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
