const mongodb = require('../data/database');

// -----------------------------
//   Find User (by ID)
// -----------------------------
const getUser = async (profile) => {
  const googleID = profile.id;
  const user = await mongodb.getDatabase().db().collection('users').findOne({ googleId: googleID });
  return user;
};

const getUserById = async (id) => {
  const user = await mongodb.getDatabase().db().collection('users').findOne({ googleId: id });
  return user;
};

const createUser = async (profile) => {
  const user = {
    googleId: profile.id,
    lastName: profile.lastName,
    firstName: profile.firstName,
    status: 'user'
  };
  const response = await mongodb.getDatabase().db().collection('users').insertOne(user);
  if (response.acknowledged) {
    console.log('User successfully added to directory!');
  } else {
    console.log('trouble creating the user');
  }
};

//
module.exports = { getUser, getUserById, createUser };
