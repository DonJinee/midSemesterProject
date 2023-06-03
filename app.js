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
const passport = require('./config/passport-setup');

const routes = require('./routes/teachers');

app.get('/', (req, res) => {
    res.render('home');
})

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
   .use(bodyParser.json())
   .use(cors())
   .use(express.json())
   .use(express.urlencoded({ extended: true }))
   .use('/', routes)
   .use('/auth', authRoutes)
   .use(error404.notFound)
   .use(error404.handleErrors)
   .set('view engine', 'ejs');

connectDB();
app.listen(Port, () => {
    console.log(`Port running on server ${Port}`)
});