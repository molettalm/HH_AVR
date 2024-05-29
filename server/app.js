require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const authenticateJWT = require('./middleware/authenticateJWT'); // Import the authentication middleware

const feedRoutes = require('./routes/feed');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const infoRouter = require('./routes/info');
const exercisesRouter = require('./routes/exercises');
const dailiesRouter = require('./routes/dailies');
const medicinesRouter = require('./routes/medicines');

const app = express();

app.set('port', process.env.PORT || 3000);

// connect to mongoDB
const dbURI = process.env.MONGODB_URI;

mongoose
.connect(dbURI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
.then(() => {
    // Listen on the port retrieved from the app settings
    app.listen(app.get('port'), () => {
        console.log(`Server connected to port ${app.get('port')} and MongoDB`);
    })
})
.catch((error) => {
    console.log('Unable to connect to Server and/or MongoDB', error)
})

app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/feed', feedRoutes);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/exercises', exercisesRouter);
app.use('/infos', infoRouter);
app.use('/dailies', dailiesRouter);
app.use('/medicines', medicinesRouter);
