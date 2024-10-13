const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Doctor Directory API',
    description:
      'A public directory containing all doctors within Utah Valley and their office contact information.'
  },
  host: 'localhost:3000', //'doctor-directory.onrender.com',
  schemes: ['http', 'https']
};

const outputFile = './swagger-output.json';
const routes = ['./routes/index.js'];

swaggerAutogen(outputFile, routes, doc);
