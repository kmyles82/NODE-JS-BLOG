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
const createUserController = require('./controllers/createUser')
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')
const expressSession = require('express-session')
const connectMongo = require('connect-mongo')
const auth = require('./middleware/auth')
const storePost = require('./middleware/storePost')

const app = new express()

mongoose.connect('mongodb://localhost/node-js-blog', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})

const mongoStore = connectMongo(expressSession);

app.use(expressSession({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    store: new mongoStore({
        mongooseConnection: mongoose.connection
    })
}))

//middleware
app.use(fileUpload())
app.use(express.static('public'));

app.use(engine);
app.set('views', `${__dirname}/views`);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Custom middleware
// app.use('/posts/store/', storePost);
//app.use('/posts/new', auth);



//Request routes
app.get('/', homePageController)

app.get('/post/:id', getPostController)

app.get('/posts/new', auth, createPostController)

app.post('/posts/store', auth, storePost, storePostController)

app.get('/auth/login', loginController)

app.post('/users/login', loginUserController)

app.get('/auth/register', createUserController)

app.post('/users/register', storeUserController)


app.listen(4000, (req, res) => {
    console.log('App listening on port 4000');
})