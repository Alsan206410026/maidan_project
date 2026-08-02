const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    phoneNumber: {
        type: String,
       
    },
    password: {
        type: String,
        minlength: 6,
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'super_admin'],
        default: 'user'
    },
    status: {
        type: String,
        enum: ["blocked", "active", "suspended"],
        default: "active"
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    verified: {
        type: Boolean,
        default: false,
    },
    otp: {
        type: String
    },
    otpExpires: {
        type: Number
    }

});
module.exports = mongoose.model("User", userSchema);