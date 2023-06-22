const express = require("express");
const multer = require("multer");
const download = require("download");
const cors = require("cors");
const { verifyToken } = require("./utils/authentication");
const { connectDataBase } = require("./utils/dbConnect");
const authRoute = require("./routes/auth");
const path = require("path");
const fs = require("fs");
const app = express();
app.use(cors());
app.use(express.json());
connectDataBase();

const PORT = 4000;

app.get("/", (req, res) => {
  res.json({ message: "All working" });
});

//Routes
app.use("/auth", authRoute);

//Upload file

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.post("/upload", verifyToken, upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  const { originalname } = req.file;

  try {
    const user = req.user;
    const randomCode = Math.floor(100000 + Math.random() * 900000);

    const imagedata = {
      imageName: originalname,
      code: randomCode,
    };

    user.image.push(imagedata);

    await user.save();

    res.json({ message: "File uploaded successfully.", user });
  } catch (error) {
    res.send("File not uploaded");
  }
});

//Download image
app.get('/download/:filename', (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, 'uploads', filename);

  res.download(filePath, filename, (err) => {
    if (err) {
      console.error('Error downloading file:', err);
      return res.status(500).send('Error downloading file.');
    }
  });
});




app.get('/image/:filename', (req, res) => {
  const { filename } = req.params;

  const imagePath = `uploads/${filename}`;
  
  // You can send the image file as a response
  res.sendFile(imagePath, { root: __dirname });
});

//Error handling
app.use((error, req, res, next) => {
  const errorMessage = error.message || "Something went wrong";
  const errorStatus = error.status || 500;

  res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
  });
});

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
