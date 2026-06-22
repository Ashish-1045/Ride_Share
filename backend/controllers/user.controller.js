const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');
const blacklistTokenSchema = require('../models/blacklistToken.model');

module.exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { fullname, email, password } = req.body;

 const isUserAlready = await userModel.findOne({email});
 if(isUserAlready){
  return res.status(400).json({message:' User Already exist '})
 }

  const hashedPassword = await userService.hashPassword(password);

  const user = await userService.createUser({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashedPassword,
  });

  const token = user.generateAuthToken();
  res.status(201).json({
    user: {
      id: user._id,
      email: user.email,
      fullname: user.fullname,
      token
    }
  });
};


module.exports.loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  console.log(req.body);
  console.log(errors);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;

  const user = await userModel.findOne({email}).select('+password');
  
  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const token = user.generateAuthToken();
  res.status(200).json({
    user: {
      id: user._id,
      email: user.email,
      fullname: user.fullname,
      token
    }
  });
};


module.exports.getUserProfile = async (req, res, next) => {
  res.status(200).json({ user: req.user });  
};

// module.exports.logoutUser = async (req, res, next) => {
//   res.clearCookie('token');
//   const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];
//    await blacklistTokenSchema.create({ token });
//   res.status(200).json({ message: 'Logged out successfully' });
// };

module.exports.logoutUser = async (req, res, next) => {
  try {
    res.clearCookie("token");

    const token =
      req.cookies?.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    await blacklistTokenSchema.findOneAndUpdate(
      { token },
      { token },
      { upsert: true },
    );

    return res.status(200).json({
      message: "Logged out successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};