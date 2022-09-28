const express = require("express");
const router = express.Router();

// Controller
const { insertPhoto } = require("../controllers/PhotoController");

//Middlewares
const validate = require("../middlewares/handleValidation");
const authGuard = require("../middlewares/authGuard");
const { photoInsertValidation } = require("../middlewares/photoValidation");
const { imageUpload } = require("../middlewares/imageUpload");

//Routes
router.post("/", authGuard, imageUpload.single("image"), photoInsertValidation(), validate, insertPhoto);

module.exports = router;