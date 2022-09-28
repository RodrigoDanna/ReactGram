const Photo = require("../models/Photo");
const User = require("../models/User");

const mongoose = require("mongoose");

// Insert
const insertPhoto = async(req, res) => {
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
        return;
    }

    res.status(201).json(newPhoto);
}

const deletePhoto = async(req, res) => {
    const {id} = req.params;

    const reqUser = req.user;

    try {
        const photo = await Photo.findById(mongoose.Types.ObjectId(id));

        // Check if photo exists
        if(!photo || !photo.userId.equals(reqUser._id)){
            res.status(404).json({errors: ["Photo not found."]});
            return;
        }

        await Photo.findByIdAndDelete(photo._id);
        
        res.status(200).json({id: photo._id, message: "Photo deleted successfully."});
    } catch (error) {
        res.status(404).json({errors: ["Photo not found."]});
    }
}

module.exports = {
    insertPhoto,
    deletePhoto
}