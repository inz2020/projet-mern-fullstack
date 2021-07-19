const mongoose = require('mongoose');
const PostSchema = new mongoose.Schema({
    postId: {
        type: String,
        trim: true,
        unique: true
    },

    message: {
        type: String,
        trim: true,
        maxLength: 500

    },
    image: {
        type: String
    },
    video: {
        type: String
    },
    likers: {
        type: [String],
        required: true,
    },
    comments: {
        type: [{
            commentId: String,
            commentPseudo: String,
            text: String,
            timestamp: Number,
        }],
        required: true,
    },

}, { timestamps: true });


module.exports = mongoose.model('post', PostSchema);