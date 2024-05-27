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

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use('/api/feed', feedRoutes);
app.use('/api/exercises', exercisesRouter);
app.use('/api/infos', infoRouter);
app.use('/api/dailies', dailiesRouter);
app.use('/api/medicines', medicinesRouter);

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
