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

// connect to mongoDB
const dbURI = 'mongodb+srv://admin:admin@healthyhub-dev.8v74ddz.mongodb.net/?retryWrites=true&w=majority&appName=healthyhub-dev'
mongoose
.connect(dbURI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
.then(() => {
    app.listen(3000, () => {
        console.log('Server connected to port 3000 and MongoDB')
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
