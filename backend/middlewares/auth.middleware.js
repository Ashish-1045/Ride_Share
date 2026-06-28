const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');  
const blacklistedTokenModel = require("../models/blacklistToken.model");
const captainModel = require('../models/captain.model');


module.exports.authuser = async (req, res , next ) => {
  const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const blacklistedToken = await blacklistedTokenModel.findOne({ token });
  if (blacklistedToken) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded._id)
    req.user = user;
    return next();
}catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
}

module.exports.authCaptain = async(req,res,next)=>{
  const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];
  if(!token){
    return res.status(401).json({message:'unauthorized'})
  }
  const blacklistedToken = await blacklistedTokenModel.findOne({token : token});
  if(blacklistedToken){
    return res.status(401).json({message:'unauthorized'})
  }
  try{
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    const captain = await captainModel.findById(decoded._id)
    req.captain = captain;
    return next();
  }catch(error){
    return res.status(401).json({message:'unauthorized'})
  }
}

