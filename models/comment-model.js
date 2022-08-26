const { Schema, model } = require("mongoose");

const CommentModel = new Schema({
    text: {
        type: String,
        required: true
    },
    liked: {
        type: String
    },
    isEdited: {
      type: Boolean,
      default: false
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
})

module.exports = model('Comment', CommentModel);