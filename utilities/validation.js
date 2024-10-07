const { body, validationResult } = require('express-validator');
const validate = {};

// ---------------------------------
//     Check "Add Doctor" Fields
// ---------------------------------

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

// ---------------------------------
//     Check "Update Doctor" Fields    ** Does htis need to be separate?  Or if I use the doctor rules will it still work?  Lets see.
// ---------------------------------

// validate.updateDoctorRules = () => {
//   return (
//     [
//       body('firstName').trim().isLength({ min: 1 }).withMessage('Please provide a first name'),
//       body('lastName').trim().isLength({ min: 1 }).withMessage('Please provide a last name'),
//       body('title').trim().isLength({ min: 1 }).withMessage('Please provide a title'),
//       body('specialty').trim().isLength({ min: 1 }).withMessage('Please provide a specialty'),
//       body('organization')
//         .trim()
//         .isLength({ min: 1 })
//         .withMessage('Please provide an organization'),
//       body('phone').trim().isLength({ min: 1 }).withMessage('Please provide a phone number'),
//       body('fax').trim().isLength({ min: 1 }).withMessage('Please provide a fax number'),
//       body('website').trim().isLength({ min: 1 }).withMessage('Please provide website')
//     ]
//   )
// }

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
