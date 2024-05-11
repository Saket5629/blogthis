const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    coverImageURL: {
        type: String,
        required: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref:   "User"
    },
}, { timestamps: true } );

const Vlog = mongoose.model("Vlog", blogSchema);

module.exports = Vlog;