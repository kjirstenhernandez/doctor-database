const express = require('express');
const router = express.Router();
const passport = require('passport');
const validate = require('../utilities/validation');
const utilities = require('../utilities/');
const usersController = require('../controllers/users');

// Build profile view for authenticated viewers
router.get('/', (req, res) => {
  if (!req.user) {
    res.redirect('/auth/login');
  } else {
    res.send(`Welcome to your profile, ${req.user.firstName}!`);
  }
});

// Update User Info
router.put(
  '/:id',
  utilities.isAuthenticated,
  validate.updateUserRules(),
  validate.checkValidation,
  (req, res, next) => {
    /*  #swagger.auto = false

        #swagger.path = '/profile/{id}'
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
  utilities.errorHandler(usersController.updateUser)
);

// Delete User
router.delete(
  '/:id',
  utilities.isAuthenticated,
  utilities.errorHandler(usersController.deleteUser),
  (req, res) => {
    /*  #swagger.auto = false

      #swagger.path = '/profile/{id}'
      #swagger.method = 'delete'
      #swagger.produces = ['application/json']
      #swagger.consumes = ['application/json']

      #swagger.parameters['id'] = {
          in: 'path',
          description: 'user ID.',
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
    req.logout((err) => {
      if (err) {
        res.redirect('/error/');
      }
      res.redirect('/');
    });
  }
);

module.exports = router;
