const { createError } = require("../utils/error");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const fs = require('fs');
const path = require('path');

exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const newUser = new User({
      username,
      email,
      password,
    });

    await newUser.save();

    res.status(201).json({ message: "Registration successfull", newUser });
  } catch (error) {
    if (error.keyValue.email) {
      next(createError(403, "Email Already exist"));
    }
  }
};

//Login
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return next(createError(403, "User not found"));
    }

    const isPasswordMatch = password === user.password;

    if (!isPasswordMatch) {
      return next(createError(403, "Invlaid credentials"));
    }

    const token = jwt.sign(
      { _id: user._id },
      "Thhisisaverypowerfullsecretekey"
    );
    res.status(201).json({ message: "Logged in", user, token });
  } catch (error) {
    next(error);
  }
};

//For test
exports.me = async (req, res, next) => {
  try {
    res.json({ message: "All working", user: req.user });
  } catch (error) {
    next(createError(404, "Token wrong"));
  }
};

//Get image details
exports.getImages = async (req, res, next) => {
  try {
    const userImage = req.user.image;

    res.json({ image: userImage });
  } catch (error) {
    next(createError(404, "Images not found"));
  }
};

//Delete image

exports.deleteImage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userImage = req.user.image;
    
    const imageToDelete = await userImage.find((image) => image._id == id);
    
    const filterImage = userImage.filter((image) => image._id != id);
    
    // console.log(imageToDelete)

    req.user.image = filterImage;

    await req.user.save();

    const imagePath = path.join(__dirname, '../uploads', imageToDelete.imageName);
    console.log(imagePath)
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error('Error deleting image file:', err);
      }
    });

    res.json({ message: "File deleted successfully ", userImage });
  } catch (error) {
    next(createError(404, "Images not found"));
  }
};
