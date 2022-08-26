const { Schema, model } = require("mongoose");

const PhoneModel = new Schema({
    text: {
        type: String,
        required: true
    },
})

module.exports = model('Phone', PhoneModel);