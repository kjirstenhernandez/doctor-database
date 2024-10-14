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

//
module.exports = { getUser, getUserById, createUser };
