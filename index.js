const path = require('path');
const {
    config,
    engine
} = require('express-edge');
const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Post = require('./database/models/Post')

const app = new express()

mongoose.connect('mongodb://localhost/node-js-blog', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(express.static('public'));

app.use(engine);
app.set('views', `${__dirname}/views`);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))

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
    // console.log(req.body)
    Post.create({
        title: req.body.title,
        description: req.body.description,
        contents: req.body.content
    }, (error, post) => {
            // console.log(error, post)
            res.redirect('/')
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