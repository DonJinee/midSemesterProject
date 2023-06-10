const express = require('express');
const app = express();
require('dotenv').config();
const Port = process.env.Port || 3000;
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const cors = require('cors');
const error404 = require('./controller/errorhandling');
const connectDB = require('./config/connect');
const authRoutes = require('./routes/auth-route');
const path = require('path')
const session = require('express-session');
const passport = require('passport');
const passport_setup = require('./config/passport-setup');
passport_setup(passport);
const MongoStore = require('connect-mongo')(session)
const mongoose = require('mongoose')
const routes = require('./routes/teachers');

app.use(express.static(path.join(__dirname, 'views')));
app.set('view engine', 'ejs')

app.use(session({
    secret: 'donjinee',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({mongooseConnection: mongoose.connection})
}))

app.use(passport.initialize());
app.use(passport.session());

app.use('/', require('./routes/index'))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
   .use(bodyParser.json())
   .use(cors())
   .use(express.json())
   .use(express.urlencoded({ extended: true }))
   .use('/', routes)
   .use('/auth', authRoutes)
   .use(error404.notFound)
   .use(error404.handleErrors);

app.use('/', require('./routes/index'))

connectDB();
app.listen(Port, () => {
    console.log(`Port running on server ${Port}`)
});