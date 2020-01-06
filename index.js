const {
    config,
    engine
} = require('express-edge');
const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const createPostController = require('./controllers/createPost')
const homePageController = require('./controllers/homePage')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')
const contactPageController = require('./controllers/contactPage')
const storePost = require('./middleware/storePost')

const app = new express()

mongoose.connect('mongodb://localhost/node-js-blog', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

//middleware
app.use(fileUpload())
app.use(express.static('public'));

app.use(engine);
app.set('views', `${__dirname}/views`);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//Custom middleware
app.use('/posts/store/', storePost)


//Request routes
app.get('/', homePageController)

app.get('/posts/new', createPostController)

app.post('/posts/store', storePostController)

app.get('/post/:id', getPostController)

app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/contact', contactPageController)



app.listen(4000, (req, res) => {
    console.log('App listening on port 4000');
})