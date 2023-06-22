

const mongoose = require("mongoose");

exports.connectDataBase = async () => {
  try {
    await mongoose.connect('mongodb+srv://prakash0508:ycM0vqPXlvd2VQmV@cluster0.htu8juv.mongodb.net/');
    console.log("Connected to database ");
  } catch (error) {
    console.log("Not Connected to database");
  }
};