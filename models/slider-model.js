const { Schema, model } = require("mongoose");

const SliderModel = new Schema({
    image: {
        type: String,
        required: true
    },
})

module.exports = model('Slider', SliderModel);