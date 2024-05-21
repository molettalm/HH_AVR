const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('./Auth'); // Assuming this file contains Passport configuration

const feedRoutes = require('./routes/feed');
const infoRouter = require('./routes/info');
const exercisesRouter = require('./routes/exercises');
const dailiesRouter = require('./routes/dailies');
const medicinesRouter = require('./routes/medicines');
const Authentication = require('./routes/Auth');
const User = require('./routes/User');

const app = express();
const logger = require('morgan');

require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));

// Configure express-session
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.mongoDB_secret,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
    }),
  })
);

// Initialize Passport after configuring express-session
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/feed', feedRoutes);
app.use('/exercises', exercisesRouter);
app.use('/infos', infoRouter);
app.use('/dailies', dailiesRouter);
app.use('/medicines', medicinesRouter);
app.use('/auth', Authentication);
app.use('/user', User);

mongoose
  .connect('mongodb+srv://admin:admin@healthyhub-dev.8v74ddz.mongodb.net/?retryWrites=true&w=majority&appName=healthyhub-dev', {
    useNewUrlParser: true,
  })
  .then(result => {
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch(err => console.log('err', err));
