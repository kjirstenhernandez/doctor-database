const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// -----------------------------
//   Get One Doctor (by ID)
// -----------------------------
const getOne = async (req, res) => {
  try {
    const docID = ObjectId.createFromHexString(req.params.id);
    const result = await mongodb.getDatabase().db().collection('doctors').find({ _id: docID });
    result.toArray().then((doctor) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(doctor);
    });
  } catch (error) {
    res.status();
  }
};

// -----------------------------
//   Get One Doctor (by Name)
// -----------------------------
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

// -----------------------
//   Get All Doctors
// -----------------------
const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDatabase().db().collection('doctors').find();
    result.toArray().then((doctors) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(doctors);
    });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while retrieving list', error });
  }
};

// TODO: find all doctors in a specific organization

// TODO: find all doctors in a specialty

// -----------------------
//   Add New Doctor
// -----------------------
const addDoctor = async (req, res) => {
  const doctor = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    title: req.body.title,
    specialty: req.body.specialty,
    subspecialty: req.body.subspecialty,
    organization: req.body.organization,
    phone: req.body.phone,
    fax: req.body.fax,
    website: req.body.website
  };
  const response = await mongodb.getDatabase().db().collection('doctors').insertOne(doctor);
  if (response.acknowledged) {
    res.status(204).send('Doctor successfully added to directory!');
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the doctor');
  }
};

// -----------------------
//     Update Doctor
// -----------------------
const updateDoctor = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Invalid doctor selected (no such ID exists)');
  }
  const docId = ObjectId.createFromHexString(req.params.id);

  const allowedFields = [
    'firstName',
    'lastName',
    'title',
    'specialty',
    'subspecialty',
    'organization',
    'phone',
    'fax',
    'website'
  ];

  const updateFields = Object.fromEntries(
    //more concise solution found online
    allowedFields
      .filter((field) => req.body[field] !== undefined && req.body[field] !== 'any') //filters only the valid fields
      .map((field) => [field, req.body[field]])
  );

  const response = await mongodb
    .getDatabase()
    .db()
    .collection('doctors')
    .updateOne({ _id: docId }, { $set: updateFields });
  if (response.modifiedCount > 0) {
    res.status(200).send('Succesfully updated doctor!');
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the doctor');
  }
};

// -----------------------
//   Remove Doctor
// -----------------------

const removeDoctor = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Invalid ID');
  }
  const docId = ObjectId.createFromHexString(req.params.id);
  const result = await mongodb.getDatabase().db().collection('doctors').deleteOne({ _id: docId });
  if (result.deletedCount > 0) {
    res.status(200).send('doctor successfully deleted!');
  } else {
    res.status(500).json(result.error || 'Some error occurred while deleting the doctor');
  }
};

module.exports = { getOne, getAll, getByName, addDoctor, updateDoctor, removeDoctor };
