const mongodb = require('../data/database');

// Find user with profile
const getUser = async (profile) => {
  const googleID = profile.id;
  const user = await mongodb.getDatabase().db().collection('users').findOne({ googleId: googleID });
  return user;
};

// find user by id only
const getUserById = async (id) => {
  const user = await mongodb.getDatabase().db().collection('users').findOne({ googleId: id });
  return user;
};

// Create User
const createUser = async (profile) => {
  const capitalize = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase(); //capitalize the given profile
  };
  const user = {
    googleId: profile.id,
    lastName: capitalize(profile.name.familyName),
    firstName: capitalize(profile.name.givenName),
    status: 'user' //default status
  };
  const response = await mongodb.getDatabase().db().collection('users').insertOne(user);
  if (response.acknowledged) {
    console.log('User successfully added to directory!');
  } else {
    console.log('trouble creating the user');
  }
  return user;
};

//Update User
const updateUser = async (req, res) => {
  console.log(req.user);
  console.log(req.params.id);
  if (req.user.googleId != req.params.id) {
    //checking to see that authenticated user is making changes to their own profile
    res.status(400).json('You are not authorized to make changes to this user');
  }

  const userId = req.params.id;
  const allowedFields = ['firstName', 'lastName'];

  const updateFields = Object.fromEntries(
    //more concise solution found online
    allowedFields
      .filter((field) => req.body[field] !== undefined && req.body[field] !== 'any') //filters only the valid fields
      .map((field) => [field, req.body[field]])
  );

  const response = await mongodb
    .getDatabase()
    .db()
    .collection('users')
    .updateOne({ googleId: userId }, { $set: updateFields });
  if (response.modifiedCount > 0) {
    res.status(200).send('Succesfully updated user!');
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the user');
  }
};

//Delete User
const deleteUser = async (req, res) => {
  if (req.user.googleId != req.params.id) {
    //checking to see that authenticated user is making changes to their own profile
    res.status(400).json('You are not authorized to make changes to this user');
  }
  const userId = req.params.id;
  const result = await mongodb
    .getDatabase()
    .db()
    .collection('users')
    .deleteOne({ googleId: userId });
  if (result.deletedCount > 0) {
    res.status(200).send('user successfully deleted!');
  } else {
    res.status(500).json(result.error || 'Some error occurred while deleting the user');
  }
};

module.exports = { getUser, getUserById, createUser, updateUser, deleteUser }; //
