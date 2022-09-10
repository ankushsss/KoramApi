const UserModel = require("../newmodel/user.model");
const OtpModel = require("../newmodel/otp.model");
const AdminModel = require("../newmodel/admin.model");
const MessageModel = require("../newmodel/message.model");
const ChatRoomModel = require("../newmodel/chatroom.model");
const NotificationModel = require("../newmodel/notification.model");
const img = require("../controllers/images.controller");
// const multer = require("multer")
// const multer = require("multer")
const axios = require('axios')

const HttpException = require('../utils/HttpException.utils');
const {
    validationResult
} = require('express-validator');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
var nf = require('node-fetch');
const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');
dotenv.config();

const {
    nanoid
} = require('nanoid');


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

module.exports.checkapi = async (req, res) => {
    //console.log(req.body);
    console.log(req.user);
    res.status(200).json({
        message: "Success. API is working."
    })
}

module.exports.sendOTP = async (req, res) => {
    var otp = getRandomInt(9999);
    const number = req.body.phone_number;
    if (otp < 1000) {
        console.log(otp);
        otp += 1000;
    }
    //console.log(otp);

    resp = await nf("https://2factor.in/API/V1/e8c91852-bf45-11ea-9fa5-0200cd936042/SMS/" + number + "/" + otp);
    const doc = {
        "phone_number": number,
        "otp": otp
    }

    if (resp.status == 200) {
        await OtpModel.updateOne({
            "phone_number": number
        }, {
            $set: {
                "otp": otp
            }
        }, {
            upsert: true
        });
        res.status(200).json({
            status: "success",
            message: "OTP sent successfully"
        });
    } else {
        return res.status(500).json({
            status: "Internal Server Error"
        });
    }

}

module.exports.verifyOTP = async (req, res) => {
    const number = req.body.phone_number;
    const otp = req.body.otp;



    const theotp = await OtpModel.findOne({
        "phone_number": number
    });
    if (theotp.otp == otp) {

        const secretKey = process.env.SECRET_JWT + "" || "";
        const mytoken = jwt.sign({
            phone_number: number
        }, secretKey, {
            expiresIn: '30d'
        });
        return res.status(200).json({
            status: "success",
            message: "verified successfully",
            token: mytoken,
            id: theotp._id
        });

    } else {
        return res.status(401).json({
            status: "failure",
            message: "wrong OTP"
        })
    }
}
module.exports.getUsers = async (req, res) => {
    var users = await UserModel.find();
    res.status(200).send(users);

}
module.exports.createProfile = async (req, res) => {
    console.log(req.body);
    const phone_number = req.body.phone_number;

    const name = req.body.name;
    const alias = req.body.alias;
    const gen = req.body.gender;
    const dob = req.body.dateofbirth;

    const public_gender = req.body.public_gender;
    const profile_pic_url = req.body.profile_pic_url;

    var check = await UserModel.updateOne({ "phone_number": phone_number, }, {

        "phone_number": phone_number,
        "name": name,
        "gender": gen,
        "alias": alias,
        "profile_pic_url": profile_pic_url,
        "dateofbirth": dob,
        "public_gender": public_gender,
        "role": "User"
    }, {
        upsert: true
    });
    //    
    return res.status(200).json({
        status: "user created/edited succesfully"
    });
    // }
}
module.exports.addMessage = async (req, res) => {
    var isGroup = req.body.group;
    var sentBy = req.body.sentBy;
    var sentFrom = req.body.sentFrom;
    var groupId = req.body.groupId;
    var time = req.body.time;

    if (isGroup == null) {
        var messageAdd = await MessageModel.create(

            {
                message: req.body.message,
                sentFrom: sentFrom,
                groupId: groupId,
                time: time

            });
        return res.status(200).json({
            status: "message sent"
        });
        // messageAdd = await messageAdd.;
        // .then(()=>console.log("success")).catchError((err)=>new Error());

    } else {
        var messageAdd = await MessageModel.create(

            {
                message: req.body.message,
                sentBy: sentBy,
                groupId: groupId,
                time: time,
                isGroup: isGroup
            });
        return res.status(200).json({
            status: "message sent"
        });
    }

}
module.exports.addChatroom = async (req, res) => {
    console.log(req.body)
    var category = req.body.category;
    var subCategory = req.body.subCategory;
    var superCategory = req.body.superCategory;
    var name = req.body.name;
    var image = req.body.image;
    var chatroom = await ChatRoomModel.create({
        category: category,
        subCategory: subCategory,
        superCategory: superCategory,
        users: [],
        name: name,
        image: image,
    });
    return res.status(200).json({
        status: "Chatroom added"
    });

}
module.exports.addUserToChatroom = async (req, res) => {
    var users = req.body.users;
    var isPop = req.body.isPop;
    console.log(users)
    if (isPop == "true") {
        var chatroom = await ChatRoomModel.updateOne(
            { _id: req.body._id },
            {
                $pull: { users: users },

            },
            function (err, docs) {
                if (err) {
                    console.log(err)
                }
                else {
                    console.log("Updated User : ", docs);
                }
            }
        );
    } else {
        var chatroom = await ChatRoomModel.findByIdAndUpdate(
            req.body._id,
            {
                $addToSet: { users: users },

            },
            function (err, docs) {
                if (err) {
                    console.log(err)
                }
                else {
                    console.log("Updated User : ", docs);
                }
            }
        );
    }

    return res.status(200).json(chatroom);

}
module.exports.addNotification = async (req, res) => {
    console.log("dfgdsf");
    const message = req.body.message;
    const sentBy = req.body.sentBy;
    const sentTo = req.body.sentTo;
    var notification = await NotificationModel.create({
        message: message,
        sentBy: sentBy,
        sentTo: sentTo,
    });
    return res.status(200).json({ status: "notification Sent" });
}
module.exports.getChatrooms = async (req, res) => {
    var chatrooms = await ChatRoomModel.find();
    return res.status(200).json(chatrooms);
}
module.exports.getNotification = async (req, res) => {
    var notification = await NotificationModel.find();
    return res.status(200).json(notification);
}
module.exports.getMessages = async (req, res) => {
    var chatrooms = await MessageModel.find();
    return res.status(200).json(chatrooms);
}
module.exports.getUser = async (req, res, next) => {
    phone = req.params.phone;
    var user = await UserModel.findOne({ phone_number: phone });
    return res.status(200).json(user);

}
module.exports.deleteNotification = async (req, res) => {
    const id = req.params.id;
    var result = await NotificationModel.deleteOne({ _id: id });

    return res.status(200).json({ status: "deleted" });
}
module.exports.addFriend = async (req, res) => {
    var id = req.body.id;
    var friend = req.body.friend;
    var result = await UserModel.updateOne(
        { _id: id },

        {
            $addToSet: { friend_list: friend },

        },

    )
    return res.status(200).json(result);
}
module.exports.addLocation = async (req, res) => {
    var id = req.body.id;
    var lat = req.body.lat;
    var lon = req.body.lon;
    var result = await UserModel.updateOne(
        { phone_number: id },

        {
            lat: lat,
            lon: lon,

        },

    )
    return res.status(200).json(result);
}

module.exports.addStory = async (req, res) => {
    var id = req.body.phone_number;

    var image = req.body.image;
    var result = await UserModel.updateOne(
        { phone_number: id },

        {
            $addToSet: { story: image }

        },

    )
    return res.status(200).json(result);
}

//Admin Section 
const generateAuthToken = (user) => {
    try {

        let token = jwt.sign({ 'email': user.email }, process.env.SECRETKEY, { expiresIn: '5000s' })
        return token
    }
    catch (error) {
        console.log(error);
    }
}

module.exports.adminSignIn = async (req, res, next) => {
    if (req.body.email != '') {
        console.log(req.body)
        console.log(req.body.email)
        AdminModel.findOne({
            email: req.body.email
        },
            async function (err, result) {
                console.log("login Success")
                if (err) throw err;
                let password = req.body.password

                let isLogin = await bcrypt.compare(password, result.password)// for compair hash password
                if (isLogin) {
                    token = await generateAuthToken(result)
                    res.cookie('ankush', token);// set cookie where cookie name is ankush
                    res.status(200).json({ "messege": "loginSuccess", "email": result.email });
                }
                else {
                    res.status(500).json({ "messege": "USER IS NOT FOUND" })
                }
            });
    }
    else {
        res.status(500).json({ "messege": "USER IS NOT FOUND" })
    }
};

module.exports.subAdminSignup = async (req, res, next) => {
    console.log("hey")
    let password = req.body.password
    const hashpassword = await bcrypt.hash(password, 10)// hash the password and save  into a database
    if (req.body.email != "" || req.body.password != "") {
        AdminModel.create({
            email: req.body.email,
            password: hashpassword,
            role: req.body.role
        },
            function (err, result) {
                if (err) {
                    res.json(err);
                }
                res.json(result);
            });
    }
    else {
        res.status(400).json("Pleaswe Fill All the Fileds")
    }
};

module.exports.addUser = async (req, res) => {
    try {
        console.log(req.body)
        const users = await UserModel.create({
            "name": req.body.name,
            "phone_number": req.body.phone_number,
            "alias": req.body.alias,
            "dateofbirth": req.body.dateofbirth,
            "gender": req.body.gender,
            "profile_pic_url": req.body.profile_pic_image,
            "public_gender": req.body.public_gender,
            "role": req.body.role

        });
        console.log(users)
        res.status(200).json({
            status: "SUCCESS",
            users,
        });
    }
    catch (err) {
        console.log(err)
    }

}

module.exports.editUser = async (req, res) => {
    try {
        const users = await UserModel.findOneAndUpdate({ _id: req.body._id }, {
            "name": req.body.data.name,
            "phone_number": req.body.data.phone_number,
            "alias": req.body.data.alias,
            "dateofbirth": req.body.data.dateofbirth,
            "gender": req.body.data.gender,
            "profile_pic_url": req.body.data.profile_pic_image,
            "public_gender": req.body.data.public_gender,
            "role": req.body.data.role

        });
        console.log(users)
        res.status(200).json({
            status: "SUCCESS",
            users,
        });
    }
    catch (err) {
        next(err);
    }

}

module.exports.editchatrooms = async (req, res) => {
    try {
        const users = await ChatRoomModel.findOneAndUpdate({ _id: req.body._id }, {
            "category": req.body.data.category,
            "subCategory": req.body.data.subCategory,
            "superCategory": req.body.data.superCategory,
            "name": req.body.data.name,
            "image": req.body.data.image

        });
        console.log(users)
        res.status(200).json({
            status: "SUCCESS",
            users,
        });
    }
    catch (err) {
        next(err);
    }

}

module.exports.addchatrooms = async (req, res) => {

    try {
        console.log(req.body)
        console.log(req.body.image)
        const users = await ChatRoomModel.create({
            "category": req.body.category,
            "subCategory": req.body.subCategory,
            "superCategory": req.body.superCategory,
            "name": req.body.name,


        });
        console.log(users)
        res.status(200).json({
            status: "SUCCESS",
            users,
        });
    }
    catch (err) {
        next(err);
    }

}

module.exports.isLogin = async (req, res) => {
    try {
        res.status(200).json("success")
    }
    catch (err) {
        res.status(500).json("no success")
    }
}


module.exports.getAllUserss = async (req, res) => {
    try {
        const users = await UserModel.find({});
        console.log(users)
        res.status(200).json({
            status: "SUCCESS",
            users,
        });
    }
    catch (err) {
        next(err);
    }
};

module.exports.getAllChatroom = async (req, res) => {
    try {
        const chatRooms = await ChatRoomModel.find({});
        console.log(users)
        res.status(200).json({
            status: "SUCCESS",
            chatRooms,
        });
    }
    catch (err) {
        next(err);
    }
}

module.exports.deleteSingleUser = async (req, res) => {
    const id = req.params.id;
    var result = await UserModel.deleteOne({ _id: id });

    return res.status(200).json({ status: "deleted" });
}

module.exports.deleteSingleRoom = async (req, res) => {
    const id = req.params.id;
    var result = await ChatRoomModel.deleteOne({ _id: id });

    return res.status(200).json({ status: "deleted" });
}

const sendToken = async (admin, statusCode, res) => {
    const token = await admin.getSignedJwtToken(admin);
    console.log(admin)
    res.status(statusCode).json({ sucess: true, token, admin });
};