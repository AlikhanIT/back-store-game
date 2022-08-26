const { Schema, model } = require("mongoose");

const PostModel = new Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    price1: {
        type: Number,
        required: true
    },
    price2: {
        type: Number,
        required: true
    },
    price3: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    viewsCount: {
        type: Number,
        default: 0
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
})

module.exports = model('Post', PostModel);