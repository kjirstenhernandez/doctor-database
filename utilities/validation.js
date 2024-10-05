const { body, validationResult } = require('express-validator');
const validate = {};

validate.createDoctorRules = () => {
  return [
    body('firstName').trim.isLength({ min: 1 }).withMessage('Please provide a first name'),

    body('lastName').trim.isLength({ min: 1 }).withMessage('Please provide a last name'),
    body('title').trim.isLength({ min: 1 }).withMessage('Please provide a title'),
    body('specialty').trim.isLength({ min: 1 }).withMessage('Please provide a specialty'),
    body('organization').trim.isLength({ min: 1 }).withMessage('Please provide an organization'),
    body('phone').trim.isLength({ min: 1 }).withMessage('Please provide a phone number'),
    body('fax').trim.isLength({ min: 1 }).withMessage('Please provide a fax number'),
    body('website').trim.isLength({ min: 1 }).isWeb.withMessage('Please provide website')
  ];
};

validate.checkDoctorData = async (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    if (!result.isEmpty()) {
      valList = [];
      result.array().forEach((error) => {
        valList.push(error.msg);
      });
      res.status(400).send(valList.join('; '));

      return res.status(400).send({ errors: result.array() });
    }
  }
};

module.exports = validate;
