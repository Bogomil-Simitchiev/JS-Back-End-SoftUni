const { Schema, model} = require('mongoose');

const commentSchema = new Schema({
    author: { type: String, required: true },
    content: { type: String, required: true },
});

const Comment = model('Comment', commentSchema);

module.exports = Comment;