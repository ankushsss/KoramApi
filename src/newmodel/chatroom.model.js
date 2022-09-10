
const mongoose = require("mongoose");

const ChatRoomSchema = new mongoose.Schema({
    category: String,
    subCategory: String,
    superCategory: String,
    name: String,
    users:Array,
    image: String,
});

const ChatRoom = mongoose.model("chatroom", ChatRoomSchema);

module.exports = ChatRoom;