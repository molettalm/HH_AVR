require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser'); // Import cookie-parser
const authenticateJWT = require('./middleware/authenticateJWT'); // Import the authentication middleware

const feedRoutes = require('./routes/feed');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');
const infoRouter = require('./routes/info');
const exercisesRouter = require('./routes/exercises');
const dailiesRouter = require('./routes/dailies');
const medicinesRouter = require('./routes/medicines');

const app = express();

app.set('port', process.env.PORT || 3000);

const allowedOrigins = ['https://d1pri0s4hbaibs.cloudfront.net','https://hhub.life','https://www.hhub.life', 'http://localhost:8080'];
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
app.use(cookieParser()); // Use cookie-parser middleware

// Enhanced CORS configuration with debugging

const corsOptions = {
  origin: function (origin, callback) {
    console.log('Origin:', origin); // Debugging log
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept,Authorization',
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));

// Security headers
// app.use((req, res, next) => {
//   res.setHeader('Content-Security-Policy', 'upgrade-insecure-requests');
//   next();
// });

// Routes
app.use('/feed', feedRoutes);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/exercises', exercisesRouter);
app.use('/info', infoRouter);
app.use('/dailies', dailiesRouter);
app.use('/medicines', authenticateJWT, medicinesRouter); // Protect medicines route
app.use('/logout', authenticateJWT, logoutRouter);

module.exports = app;
