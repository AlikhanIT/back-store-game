const { Schema, model } = require("mongoose");

const HelpModel = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
})

module.exports = model('Help', HelpModel);