/*
id,username, name, email, role, BirthDateTime, password
*/

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    gender: String,
    public_gender: String,
    profile_pic_url: String,
    alias: String,
    name: String,
    is_block: {type:Boolean,default:false},
    lat:{type:Number,default:0},
    lon: {type:Number,default:0},
    story:{type:Array,default:[]},
    phone_number: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "user"
    },
    dateofbirth: String,
    friend_list:{type:Array,default:[]},


}, {
    timestamps: true
})

const User = mongoose.model("user", UserSchema);

module.exports = User;