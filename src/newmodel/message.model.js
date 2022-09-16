/*
id,username, name, email, role, BirthDateTime, password
*/

const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
    message: String,
    sentBy: String,
    sentFrom: String,
    group:Boolean,
    time: String,
    groupId:String
}, {
    timestamps: true
})

const Message = mongoose.model("message", MessageSchema);

module.exports = Message;