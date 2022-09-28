const Photo = require("../models/Photo");
const User = require("../models/User");

const mongoose = require("mongoose");

// Insert
const insertPhoto = async(req, res) =>{
    const {title} = req.body
    const image = req.file.filename;

    const reqUser = req.user;

    const user = await User.findById(reqUser._id);

    // Create photo
    const newPhoto = await Photo.create({
        image,
        title,
        userId: user._id,
        userName: user.name
    })

    if(!newPhoto){
        res.status(422).json({errors: ["An unexpected error has occurred. Please try again."]})
    }

    res.status(201).json(newPhoto);
}

module.exports = {
    insertPhoto
}