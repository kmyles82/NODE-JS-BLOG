const mongoose = require('mongoose')
const Post = require('./database/models/Post')

mongoose.connect('mongodb://localhost/node-js-test-blog', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

Post.create({
    title: 'My first blog post',
    description: 'Blog post description',
    contents: 'Lorem ipsum content'
}, (error, post) => {
        console.log(error, post)
})