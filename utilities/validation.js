const { body, validationResult } = require('express-validator');
const validate = {};

validate.createDoctorRules = () => {
  return (
    [
      body('firstName').trim().isLength({ min: 1 }).withMessage('Please provide a first name'),
      body('lastName').trim().isLength({ min: 1 }).withMessage('Please provide a last name'),
      body('title').trim().isLength({ min: 1 }).withMessage('Please provide a title'),
      body('specialty').trim().isLength({ min: 1 }).withMessage('Please provide a specialty'),
      body('organization')
        .trim()
        .isLength({ min: 1 })
        .withMessage('Please provide an organization'),
      body('phone').trim().isLength({ min: 1 }).withMessage('Please provide a phone number'),
      body('fax').trim().isLength({ min: 1 }).withMessage('Please provide a fax number'),
      body('website').trim().isLength({ min: 1 }).withMessage('Please provide website')
    ],
    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json(errors.array);
      }
    }
  );
};

module.exports = validate;
