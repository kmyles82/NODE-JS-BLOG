const path = require('path');
const {
    config,
    engine
} = require('express-edge');
const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Post = require('./database/models/Post')
const fileUpload = require('express-fileupload')

const app = new express()

mongoose.connect('mongodb://localhost/node-js-blog', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(fileUpload())
app.use(express.static('public'));

app.use(engine);
app.set('views', `${__dirname}/views`);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const validateCreatePostMiddleware = (req, res, next) => {
    console.log(req)
    if (!req.files || !req.body.username || !req.body.title || !req.body.subtitle || !req.body.content) {
        return res.redirect('/posts/new')
    }
    next()
}

app.use('/posts/store/', validateCreatePostMiddleware)

app.get('/', async (req, res) => {
    const posts = await Post.find({})
    console.log(posts)
    res.render('index', {
        posts
    });
})

app.get('/posts/new', (req, res) => {
    res.render('create')
})

app.post('/posts/store', (req, res) => {
    console.log(req.files)
    const { image } = req.files

    image.mv(path.resolve(__dirname, 'public/posts', image.name), (error) => {
        Post.create({
            ...req.body,
            image: `/posts/${image.name}`

        }, (error, post) => {
            // console.log(error, post)
            res.redirect('/')
        })
    })

    
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/post/:id', async (req, res) => {
    const post = await Post.findById(req.params.id)
    // console.log(post)
    res.render('post', {
        post
    })
})

app.get('/contact', (req, res) => {
    res.render('contact')
})



app.listen(4000, (req, res) => {
    console.log('App listening on port 4000');
})