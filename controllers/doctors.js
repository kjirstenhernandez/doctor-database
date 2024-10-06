const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

//Reference for future error handler
// const ApiError = require('path for error handler');

// find  doctor by ID
const getOne = async (req, res) => {
  const docID = ObjectId.createFromHexString(req.params.id);
  const result = await mongodb
    .getDatabase()
    .db()
    .collection('doctors')
    .find({ _id: docID }, getMore);
  result.toArray().then((doctor) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(doctor);
  });
};
const getByName = async (req, res) => {
  const query = req.params.lastName;
  const result = await mongodb.getDatabase().db().collection('doctors').find({ lastName: query });
  result
    .toArray()
    .then((doctor) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(doctor);
    })
    .catch((error) => {
      res.status(500).json({ message: 'An error occurred', error });
    });
};

// find all doctors in the database
const getAll = async (req, res) => {
  const result = await mongodb.getDatabase().db().collection('doctors').find();
  result.toArray().then((doctors) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(doctors);
  });
};

// find all doctors in a specific organization

// find all doctors in a specialty

// add new doctor to the general database
const addDoctor = async (req, res) => {
  const doctor = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    title: req.body.title,
    specialty: req.body.specialty,
    organization: req.body.organization,
    phone: req.body.phone,
    fax: req.body.fax,
    website: req.body.website
  };
  const response = await mongodb.getDatabase().db().collection('doctors').insertOne(doctor);
  if (response.acknowledged) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the user');
  }
};

module.exports = { getOne, getAll, getByName, addDoctor };
