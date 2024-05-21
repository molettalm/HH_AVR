const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import cors module

const feedRoutes = require('./routes/feed');
const infoRouter = require('./routes/info');
const exercisesRouter = require('./routes/exercises');
const dailiesRouter = require('./routes/dailies');
const medicinesRouter = require('./routes/medicines');

const app = express();

app.use(cors()); // Use cors middleware to enable CORS for all routes
app.use(express.json());

app.use('/feed', feedRoutes);
app.use('/exercises', exercisesRouter);
app.use('/infos', infoRouter);
app.use('/dailies', dailiesRouter);
app.use('/medicines', medicinesRouter);

mongoose.connect(
    'mongodb+srv://admin:admin@healthyhub-dev.8v74ddz.mongodb.net/?retryWrites=true&w=majority&appName=healthyhub-dev',
    { useNewUrlParser: true }
  )
  .then(result => {
    app.listen(8080, () => {
      console.log('Server is running on port 8080');
    });
  })
  .catch(err => console.log('err', err));
