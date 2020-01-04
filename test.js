const mongoose = require('mongoose')
const Post = require('./database/models/Post')

mongoose.connect('mongodb://localhost/node-js-test-blog', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// Post.create({
//     title: 'My Second blog post',
//     description: 'Second post description',
//     contents: 'Second Lorem ipsum content'
// }, (error, post) => {
//         console.log(error, post)
// })

Post.find({}, (error, post) => {
    console.log(error, post)
})

// Post.findById("5e10d621b680db6448b1395c", (error, post) => {
//     console.log(error, post)
// })

// Post.findByIdAndUpdate('5e10d621b680db6448b1395c', {
//     title: 'My first blog post title lorem ipsum'
// }, (error, post) => {
//     console.log(error, post)
// })