const mongoose = require('mongoose');

const Car = require('./models/Car.js');
const Post = require('./models/Post.js');
const Comment = require('./models/Comment.js');

const connectionString = `mongodb://localhost:27017/testdb`;

start();

async function start() {
    await mongoose.connect(connectionString, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    });

    console.log('Database connected');

    // const post = await Post.findOne({});
    // const comment = await Comment.findOne({});

    // post.comments.push(comment);

    const post = await Post.findOne({}).populate('comments');
    console.log(post);

}