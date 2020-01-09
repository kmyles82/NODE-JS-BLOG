const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    title: String,
    subtitle: String,
    content: String,
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    image: String
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;