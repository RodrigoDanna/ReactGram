const User = require("../models/User")

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const mongoose = require("mongoose");

const fs = require("fs");

const jwtSecret = process.env.JWT_SECRET;

// Generate user token
const generateToken = (id) => {
  return jwt.sign({ id }, jwtSecret, {
    expiresIn: "7d"
  })
}

// Register user and sign in
const register = async (req, res) => {
  const { name, email, password } = req.body;

  // Generate password hash
  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);

  // Create user
  const newUser = await User.create({
    name,
    email,
    password: passwordHash
  })

  // is user was created successfully, return token
  if (!newUser) {
    res.status(422).json({ erros: ["An unexpected error has occurred, please try again."] })
    return;
  }

  res.status(201).json({
    _id: newUser._id,
    token: generateToken(newUser._id)
  })
}

const login = async (req, res) => {

  const error_message = "User or password is incorrect."

  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(422).json({ errors: [error_message] });
  }

  const password_match = await bcrypt.compare(password, user.password);
  if (!password_match) {
    return res.status(422).json({ errors: [error_message] });
  }

  return res.status(201).json({
    _id: user._id,
    profileImage: user.profileImage,
    token: generateToken(user._id)
  })
}

// Get current logged in user
const getCurrentUser = async (req, res) => {
  const user = req.user;
  res.status(200).json(user);
}

// Update user data
const update = async (req, res) => {
  const { name, password, bio } = req.body;

  let profileImage = null;
  let oldPhoto = null;

  if (req.file) {
    console.log("new image");
    profileImage = req.file.filename;
    profileImagePath = req.file.path;
  }

  const user = await User.findById(mongoose.Types.ObjectId(req.user._id)).select("-password");

  if (name) {
    user.name = name
  }

  if (password) {
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    user.password = passwordHash;
  }

  if (profileImage) {
    oldPhoto = user.profileImagePath
    user.profileImage = profileImage;
    user.profileImagePath = profileImagePath;
  } 

  if (bio) {
    user.bio = bio;
  }

  await user.save();

  //delete old photo file from directory
  if(oldPhoto){
    fs.unlink(oldPhoto, (err => {  
      if (err) { 
          console.error(err) 
      };
    }))
  }

  res.status(200).json(user);
}

const getUserById = async (req, res) =>{
  const {id} = req.params;

  try {
    const user = await User.findById(mongoose.Types.ObjectId(id)).select("-password");
    
    if(!user){
      res.status(404).json({errors: ["User not found."]})
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(422).json({errors: ["User not found."]})
    return;
  }
}

module.exports = {
  register,
  login,
  getCurrentUser,
  update,
  getUserById
}