const express = require('express');
const app = express();

const mongoose = require('mongoose');
const postsRoutes = require('./routes/posts');
const usersRoutes = require('./routes/users');
const commentsRoutes = require('./routes/comments');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const passportLocalMongoose = require('passport-local-mongoose');

const User = require('./models/user');

// DB

mongoose.connect(
  'mongodb+srv://Vinicius:vini1306@cluster0-4gadr.mongodb.net/test?retryWrites=true&w=majority',
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  () => {
    console.log('DB connected');
  }
);

// APP CONFIG

app.set('view engine', 'ejs');

app.use(
  require('express-session')({
    secret: 'Instagram Clone',
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/uploads', express.static('uploads'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/posts', postsRoutes);
app.use('/users', usersRoutes);
app.use('/posts/:postId/comments', commentsRoutes);

//ROUTES

app.get('/', (req, res) => {
  res.send('Home page');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
