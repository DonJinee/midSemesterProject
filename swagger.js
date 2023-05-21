const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'My API',
        description: 'My Teachers API',
    },
    host: 'mid-semester-project.onrender.com',
    schemes: ['https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/teachers.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);