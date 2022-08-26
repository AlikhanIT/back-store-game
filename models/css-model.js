const { Schema, model } = require("mongoose");

const CssModel = new Schema({
    imageUrl: {
        type: String,
        required: true
    },
})

module.exports = model('Css', CssModel);