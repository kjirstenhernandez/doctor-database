const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Doctor Directory API',
    description:
      'A public directory containing all doctors within Utah Valley and their office contact information.'
  },
  host: 'doctor-directory.onrender.com', //'localhost:3000',
  schemes: ['https', 'http']
};

const outputFile = './swagger-output.json';
const routes = ['./routes/index.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);
