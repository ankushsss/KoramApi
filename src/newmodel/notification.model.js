const mongoose = require("mongoose");

const NotificationSchema  = new mongoose.Schema({
    sentBy:String,
    sentTo:String,
    message:String,


});
const Notification = mongoose.model("notification",NotificationSchema);

module.exports = Notification;