const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Project Manager API',
    description: 'CRUD Project Manager ',
  },
  host: 'cse-341-w05-w08.onrender.com',
  schemes: ['https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);


// swaggerAutogen(outputFile, endpointsFiles, doc).then(async () => {
//   await import('./index.js');
// });