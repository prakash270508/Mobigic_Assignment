const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: [
      {
        imageName: String,
        code: Number,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
