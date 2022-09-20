const User = require("../models/User")

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;

// Generate user token
const generateToken = (id) => {
  return jwt.sign({ id }, jwtSecret, {
    expiresIn: "7d"
  })
}

// Register user and sign in
const register = async(req, res) => {
  const {name, email, password} = req.body;

  // Generate password hash
  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);

  // Crate user
  const newUser = await User.create({
    name,
    email,
    password: passwordHash
  })

  // is user was created successfully, return token
  if(!newUser){
    res.status(422).json({erros: ["An unexpected error has occurred, please try again."]})
    return;
  }

  res.status(201).json({
    _id: newUser._id,
    token: generateToken(newUser._id)
  })
}

const login = async (req, res) => {

  const error_message = "User or password is incorrect."

  const { email, password} = req.body;

  const user = await User.findOne({email});

  if(!user){
    return res.status(422).json({errors: [error_message]});
  }

  const password_match = await bcrypt.compare(password, user.password);
  if(!password_match){
    return res.status(422).json({errors: [error_message]});
  }

  return res.status(201).json({
    _id: user._id,
    profileImage: user.profileImage,
    token: generateToken(user._id)
  })
}

module.exports = {
  register,
  login
}