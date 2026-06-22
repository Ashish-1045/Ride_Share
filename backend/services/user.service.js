const bcrypt = require('bcrypt');
const userModel = require('../models/user.model');

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

module.exports.hashPassword = hashPassword;

module.exports.createUser = async ({
  firstname,
  lastname,
  email,
  password
}) => {
  if (!firstname || !email || !password) {
    throw new Error('All fields are required');
  }
  
  
  const user = await userModel.create({
    fullname: {
      firstname,
      lastname
    },
    email,
    password
  });

  return user;
};
