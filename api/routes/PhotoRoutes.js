const express = require("express");
const router = express.Router();

// Controller
const { register, login, getCurrentUser, update, getUserById } = require("../controllers/UserController");

//Middlewares
const validate = require("../middlewares/handleValidation");
const authGuard = require("../middlewares/authGuard");
const { photoInsertValidation } = require("../middlewares/photoValidation");
const { imageUpload } = require("../middlewares/imageUpload");

//Routes

module.exports = router;