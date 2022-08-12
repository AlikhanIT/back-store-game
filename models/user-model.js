const { Schema, model } = require("mongoose");

const UserModel = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isActivated: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    activationLink: {
        type: String
    },
})

module.exports = model('User', UserModel);