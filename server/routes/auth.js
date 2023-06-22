const express = require("express");
const { register , login, me, getImages , deleteImage} = require("../controller/userController");
const  {verifyToken} = require('../utils/authentication')

const router = express.Router();

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/me').get(verifyToken , me)
router.route('/images').get(verifyToken , getImages)
router.route('/delete/:id').get(verifyToken , deleteImage)


module.exports = router;


