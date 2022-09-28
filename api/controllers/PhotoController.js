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
        return res.status(422).json({errors: ["An unexpected error has occurred. Please try again."]})
    }

    return res.status(201).json(newPhoto);
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
        
        return res.status(200).json({id: photo._id, message: "Photo deleted successfully."});
    } catch (error) {
       return  res.status(404).json({errors: ["Photo not found."]});
    }
}

const getAllPhotos = async(req, res) => {
    const photos = await Photo.find({}).sort([["createdAt", -1]]).exec();

    return res.status(200).json(photos);
}

const getUserPhotos = async(req, res) => {
    const {id} = req.params;
    const photos = await Photo.find({userId: id}).sort([["createdAt", -1]]).exec();

    return res.status(200).json(photos);
}

const getPhotoById = async(req, res) => {
    const {id} = req.params;

    try {
        const photo = await Photo.findById(mongoose.Types.ObjectId(id));

        if(!photo){
            return res.status(404).json({errors: ["Photo not found."]});
        }

        return res.status(200).json(photo);
        
    } catch (error) {
        return res.status(404).json({errors: ["Photo not found."]});
    }
}

const updatePhoto = async(req, res) => {
    const {id} = req.params;
    const {title} = req.body;

    const reqUser = req.user;

    try {
        const photo = await Photo.findById(mongoose.Types.ObjectId(id));

        if(!photo || !photo.userId.equals(reqUser._id)){
            return res.status(404).json({errors: ["Photo not found."]});
        }

        if(title){
            photo.title = title;
        }

        await photo.save();

        return res.status(200).json({photo, message: "Photo updated successfully."});
    } catch (error) {
        return res.status(404).json({errors: ["Photo not found."]});
    }
}

const likePhoto = async(req, res) => {
    const {id} = req.params;

    const reqUser = req.user;

    const photo = await Photo.findById(mongoose.Types.ObjectId(id));

    if(!photo){
        return res.status(404).json({errors: ["Photo not found."]});
    }

    // Check if already liked
    if(photo.likes.includes(reqUser._id)){
        return res.status(422).json({photo, errors: ["Photo already liked."]});
    }

    photo.likes.push(reqUser._id);

    photo.save();

    return res.status(200).json({photo, userId: reqUser, message: "Photo liked successfully."})
}

const commentPhoto = async(req, res) => {
    const {id} = req.params;

    const {comment} = req.body;

    const reqUser = req.user;

    const user = await User.findById(reqUser._id);

    const photo = await Photo.findById(mongoose.Types.ObjectId(id));

    if(!photo){
        return res.status(404).json({errors: ["Photo not found."]});
    }

    const userComment = {
        comment,
        userName: user.name, 
        userImage: user.profileImage,
        userId: user._id
    }

    photo.comments.push(userComment);

    photo.save();

    return res.status(200).json({comment:userComment, message: "Photo commented successfully."})
}

const searchPhotos = async(req, res) => {
    const {q} = req.query;

    const photos = await Photo.find({title: new RegExp(q, "i")}).sort([["createdAt", -1]]).exec();

    return res.status(200).json(photos);
}

module.exports = {
    insertPhoto,
    deletePhoto,
    getAllPhotos,
    getUserPhotos,
    getPhotoById,
    updatePhoto,
    likePhoto,
    commentPhoto,
    searchPhotos
}