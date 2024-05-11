const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    blogId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vlog"
    }
}, { timestamps: true });

const Comment = mongoose.model("comment", commentSchema);

module.exports = Comment;