const { body, validationResult } = require('express-validator');
const validate = {};

// ---------------------------------
//       Validation Checker
// ---------------------------------

validate.checkValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json(errors.array());
  }
  next();
};

// ---------------------------------
//     Check "Add Doctor" Fields
// ---------------------------------

validate.createDoctorRules = () => {
  return [
    body('firstName').trim().isLength({ min: 1 }).withMessage('Please provide a first name'),
    body('lastName').trim().isLength({ min: 1 }).withMessage('Please provide a last name'),
    body('title').trim().isLength({ min: 1 }).withMessage('Please provide a title'),
    body('specialty').trim().isLength({ min: 1 }).withMessage('Please provide a specialty'),
    body('organization').trim().isLength({ min: 1 }).withMessage('Please provide an organization'),
    body('phone').trim().isLength({ min: 1 }).withMessage('Please provide a phone number'),
    body('fax').trim().isLength({ min: 1 }).withMessage('Please provide a fax number'),
    body('website').trim().isLength({ min: 1 }).withMessage('Please provide website')
  ];
};

// ---------------------------------
//     Check "Update Doctor" Fields
// ---------------------------------

validate.updateDoctorRules = () => {
  const fields = [
    { name: 'firstName', message: 'Please provide a first name' },
    { name: 'lastname', message: 'Please provide a first name' },
    { name: 'title', message: 'Please provide a title' },
    { name: 'specialty', message: 'Please provide a specialty' },
    { name: 'organization', message: 'Please provide an organization' },
    { name: 'phone', message: 'Please provide a phone number' },
    { name: 'fax', message: 'Please provide a fax number' },
    { name: 'website', message: 'Please provide a website' }
  ];

  return fields.reduce((updatedFields, field) => {
    if (body[field.name] != undefined && body[field.name] != 'any') {
      updatedFields.push(body(field.name).trim().isLength({ min: 1 }.withMessage(field.message)));
    }
    return updatedFields;
  }, []); //double bracket serve as teh initial value for the accumulator in .reduce() function
};

// -------------------------------------
//     Check "Update Profile" Fields
// -------------------------------------
validate.updateUserRules = () => {
  const fields = [
    { name: 'firstName', message: 'Please provide a first name' },
    { name: 'lastName', message: 'Please provide a first name' }
  ];

  return fields.reduce((updatedFields, field) => {
    if (body[field.name] != undefined && body[field.name] != 'any') {
      updatedFields.push(body(field.name).trim().isLength({ min: 1 }.withMessage(field.message)));
    }
    return updatedFields;
  }, []);
};
// -------------------------------------------
//     Check "Find Doctor by Last Name" Fields  ** Waiting until we have the primary function working first,
// --------------------------------------------
// validate.findDoctorByLastNameRules = () => {
//   const docID = ObjectId.createFromHexString(req.params.id);
//   return (
//     [docID.trim().isLength({ min: 1 }).withMessage('Please provide a last name')],
//     (req, res) => {
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         return res.status(422).json(errors.array);
//       }
//     }
//   );
// };

module.exports = validate;
