const express = require("express");
const multer = require('multer')
const fs = require('fs')
// const mongoose = require("mongoose");
const router = express.Router();
const api = require("../controllers/api.controller");
const img = require("../controllers/images.controller");
const auth = require("../middleware/authapi.middleware");

// const upload = require("../middleware/upload");
var storage = multer.diskStorage({
    destination: './upload/chatRoom',
    filename: function (req, file, cb) {
  
      cb(null, Date.now() + ".." + file.originalname);
    }
  });// for file upload destination path and name of file
  var upload = multer({ storage });

router.get("/v1/", auth.isUserAuth, api.checkapi);
router.post("/v1/otp", api.sendOTP);
router.post("/v1/otp/verify", api.verifyOTP);
router.post("/v1/profile/create", api.createProfile);
router.get("/v1/users", api.getUsers);
router.get("/v1/users/:phone", api.getUser);
router.get("/v1/chatrooms", api.getChatrooms);
router.get("/v1/message", api.getMessages);
router.get("/v1/notifications", api.getNotification);
router.post("/v1/sendMessage", api.addMessage);
router.post("/v1/addFriend", api.addFriend);
router.post("/v1/addLocation", api.addLocation);
router.post("/v1/addStory", api.addStory);
router.post("/v1/notification", api.addNotification);
router.post("/v1/chatroom", api.addChatroom);
router.post("/v1/updateUser", api.addUserToChatroom);
router.post("/v1/images", img.saveMedia);
router.get('/v1/images/:id', img.getImg);
router.delete("/v1/notifications/:id", api.deleteNotification);

// auth
router.post("/v1/signin", api.adminSignIn);
router.post("/v1/signup", api.subAdminSignup);
router.get("/v1/logout",api.logout)
//admin post 
router.post("/v1/editUser", api.editUser);
router.post("/v1/imageUploadRoom",upload.single('file'), api.imageUploadRoom);
router.post("/v1/blockUser", api.blockUser);
router.post("/v1/addUser", api.addUser);
router.post("/v1/editchatrooms", api.editchatrooms);
router.post("/v1/addchatrooms", api.addchatrooms);
//admin panel get method 
router.get("/v1/isLogin", auth.Authenticate, api.isLogin);
router.get("/v1/alluser", auth.Authenticate, api.getAllUserss);
router.get("/v1/chatrooms",auth.Authenticate, api.getAllChatroom);

//admin delete method
router.delete("/v1/user/:id", api.deleteSingleUser);
router.delete("/v1/room/:id", api.deleteSingleRoom);

module.exports = router;