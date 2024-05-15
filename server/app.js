//import express
const express = require('express');
// import mangoose
const mongoose = require('mongoose');

// import the feed routes
const feedRoutes = require('./routes/feed');
const infoRouter = require('./routes/info');
const exercisesRouter = require('./routes/exercises');
const dailiesRouter = require('./routes/dailies');
const medicinesRouter = require('./routes/medicines');
// create the express app
const app = express();
// to parse incoming json
app.use(express.json());
// forward any incoming request that starts with '/feed' to feedRoutes
app.use('/feed', feedRoutes);
app.use('/exercises', exercisesRouter);
app.use('/infos', infoRouter);
app.use('/dailies', dailiesRouter);
app.use('/medicines', medicinesRouter);
// setup a database connection using mongoose
// past the connection string given from your atlas server
mongoose
  .connect(
    'mongodb+srv://admin:admin@healthyhub-dev.8v74ddz.mongodb.net/?retryWrites=true&w=majority&appName=healthyhub-dev', { useNewUrlParser: true })
  .then(result => {
    // listen to incoming requests on port 8080
    app.listen(3000);
  })
  .catch(err => console.log('err', err))