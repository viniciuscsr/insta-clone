const express = require('express');
const app = express();

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const methodOverride = require('method-override');
const User = require('./models/user');

const postsRoutes = require('./routes/posts');
const usersRoutes = require('./routes/users');
const commentsRoutes = require('./routes/comments');
const followRoutes = require('./routes/follow');
const indexRoutes = require('./routes/index');

// DB

mongoose.connect(
  process.env.DATABASEURL ||
    `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0-4gadr.mongodb.net/test?retryWrites=true&w=majority`,
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

app.use('/public', express.static('public'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

app.use(indexRoutes);
app.use(followRoutes);
app.use('/posts', postsRoutes);
app.use('/users', usersRoutes);
app.use('/posts/:postId/comments', commentsRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log('Server running on port 3000');
});
