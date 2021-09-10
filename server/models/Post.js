const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const PostSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    textBody: {
        type: String,
        required: false,
        unique: false,
    },
    titleImageLink: {
        type: String,
        required: false,
    },
    bodyImageLinks: [{
        type: String,
        required: false,
    }],
    postVid: {
        type: String,
        required: false
    },
    latitude: {
        type: Number,
        required: true,
    },
    longitude: {
        type: Number,
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    pinned: {
        type: Boolean,
        default: false,
    },
    albumID: {
        type: Schema.Types.ObjectId,
        ref: 'Album'
    }
});

module.exports = Post = mongoose.model('Post', PostSchema);