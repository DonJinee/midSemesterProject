const express = require('express');
const app = express();
require('dotenv').config();
const Port = process.env.Port || 3000;
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const cors = require('cors');
const error404 = require('./controller/errorhandling');

const routes = require('./routes/teachers');

app.get('/', (req, res) => {
    res.send('<h1>Welcome to my project! My name is Richard Omachona</h1>');
})

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
   .use(bodyParser.json())
   .use(cors())
   .use(express.json())
   .use(express.urlencoded({ extended: true }))
   .use('/', routes)
   .use(error404.notFound)
   .use(error404.handleErrors);


app.listen(Port, () => {
    console.log(`Port running on server ${Port}`)
    console.log('Project database is connected!!!')
});