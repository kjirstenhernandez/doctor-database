const express = require('express');
const router = express.Router();
const doctorsController = require('../controllers/doctors');
const validate = require('../utilities/validation');
const utilities = require('../utilities/index');

// Pull Contact Info
router.get('/', utilities.isUser, utilities.errorHandler(doctorsController.getAll)); // ALL doctors in the collection
router.get('/:id', utilities.isUser, utilities.errorHandler(doctorsController.getOne)); // One doctor in  collection by ID
router.get(
  '/lastname/:lastName',
  utilities.isUser,
  utilities.errorHandler(doctorsController.getByName)
); // one doctor in the collection, by last name (workign on it, not working currently)

// Add Doctor
router.post(
  '/',
  utilities.isAdmin,
  validate.createDoctorRules(),
  validate.checkValidation,
  (req, res, next) => {
    // Because Swagger isn't autogenerating the correct parameters:
    /*  #swagger.auto = false

        #swagger.path = '/doctors'
        #swagger.method = 'post'
        #swagger.produces = ['application/json']
        #swagger.consumes = ['application/json']

        #swagger.parameters['body'] = {
            in: 'body',
            description: '',
            required: true,
            schema: {
                firstName: "any",
                lastName: "any",
                title: "any",
                specialty: "any",
                subspecialty: "any",
                organization: "any",
                phone: "any",
                fax: "any",
                website: "any"
            }
        }
        #swagger.responses[204] = {
        description: "No Content" }

        #swagger.responses[400] = {
        description: "Bad Request" }
        
        #swagger.responses[500] = {
        description: "Internal Service Error" }
    */
    next();
  },
  utilities.errorHandler(doctorsController.addDoctor)
);

// Update Doctor
router.put(
  '/:id',
  utilities.isAdmin,
  validate.updateDoctorRules(),
  validate.checkValidation,
  (req, res, next) => {
    /*  #swagger.auto = false

        #swagger.path = '/doctors/{id}'
        #swagger.method = 'put'
        #swagger.produces = ['application/json']
        #swagger.consumes = ['application/json']

        #swagger.parameters['id'] = {
            in: 'path',
            description: 'User ID.',
            required: true,
            type: 'string'
        }

        #swagger.parameters['body'] = {
            in: 'body',
            description: '',
            required: true,
            schema: {
                firstName: "any",
                lastName: "any",
                title: "any",
                specialty: "any",
                subspecialty: "any",
                organization: "any",
                phone: "any",
                fax: "any",
                website: "any"
            }
        }
        #swagger.responses[204] = {
        description: "No Content" }

        #swagger.responses[400] = {
        description: "Bad Request" }
        
        #swagger.responses[500] = {
        description: "Internal Service Error" }
    */
    next();
  },
  utilities.errorHandler(doctorsController.updateDoctor)
);

// Delete Doctor
router.delete(
  '/:id',
  utilities.isAdmin,
  (req, res, next) => {
    /*  #swagger.auto = false

      #swagger.path = '/doctors/{id}'
      #swagger.method = 'delete'
      #swagger.produces = ['application/json']
      #swagger.consumes = ['application/json']

      #swagger.parameters['id'] = {
          in: 'path',
          description: 'doctor ID.',
          required: true,
          type: 'string'
      }
      #swagger.responses[200] = {
      description: "OK" }
      
      #swagger.responses[400] = {
      description: "Bad Request" }
      
      #swagger.responses[500] = {
      description: "Internal Service Error" }
  */
    next();
  },
  utilities.errorHandler(doctorsController.removeDoctor)
);

module.exports = router;
