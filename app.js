// Import .env file
require('dotenv').config()
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');

const index = require('./routes/index');
const searchEngine = require('./routes/search');
const admin = require('./routes/admin');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', index);
app.use('/search', searchEngine);
app.use('/admin', admin);

// Mongodb
var MongoClient = require('mongodb').MongoClient

MongoClient.connect(process.env.MONGODB_URL, function (err, client) {
  if (err) throw err

  app.locals.db = client.db('faqjs');
  console.log('Connected to MongoDB');
})

// Google login
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
  }, function(accessToken, refreshToken, profile, done) {
    const db = app.locals.db;
    db.collection('users').findAndModify(
      { googleId: profile.id },
      [[ 'googleId', 1 ]],
      {
        $setOnInsert: {
          googleId: profile.id,
          displayName: profile.displayName,
          email: profile.emails[0].value, // Grab only the first email
          approved: true
        }
      },
      {
        new: true,
        upsert: true
      },
      function(err, document) {
        return done(err, document.value);
      }
    );
  }
));

passport.serializeUser(function(user, done) {
  return done(null, user.googleId);
});

passport.deserializeUser(function(id, done) {
  const db = app.locals.db
  db.collection('users').findOne(
    { googleId: id },
    {},
    function(err, document) {
      return done(err, document);
    }
  )
});

app.get('/auth/google',
  passport.authenticate(
    'google',
    { scope: [
        'https://www.googleapis.com/auth/plus.login',
        'https://www.googleapis.com/auth/plus.profile.emails.read'
      ]
    }
  )
);

app.get('/auth/google/callback',
  passport.authenticate('google',
                        {
                          successRedirect: '/admin/manage/threads',
                          failureRedirect: '/'
                        }),
  function(req, res) {
    res.redirect('/');
  }
);

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
