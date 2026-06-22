const blacklistTokenModel = require("../models/blacklistToken.model");
const captainModel = require("../models/captain.model");
const captainService = require("../services/captain.service");
const { validationResult } = require("express-validator");


module.exports.registerCaptain = async (req, res, next) => {
  try {
    console.log("Controller body:", req.body);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password, vehicle } = req.body;

    const existing = await captainModel.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Captain already exists" });

    const captain = await captainService.CreateCaptain({
      fullname,
      email,
      password,
      vehicle,
    });

    const token = captain.generateAuthToken();

    res.status(201).json({ token, captain });
  } catch (err) {
    console.error(err);
    next(err);
  }
};


module.exports.loginCaptain = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const captain = await captainModel.findOne({ email }).select("+password");

    if (!captain) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await captain.comparePassword(password); 

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = captain.generateAuthToken();

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.status(200).json({ token, captain });
  } catch (err) {
    next(err);
  }
};

module.exports.getCaptainProfile = async (req, res) => {
  return res.status(200).json({ captain: req.captain });
};

module.exports.logoutCaptain = async (req, res, next) => {
  try {
    const token =
      req.cookies.token || req.headers["authorization"]?.split(" ")[1];

    if (token) {
      await blacklistTokenModel.create({ token });
    }

    res.clearCookie("token");

    return res.status(200).json({ message: "Logout successful" });
  } catch (err) {
    next(err);
  }
};
