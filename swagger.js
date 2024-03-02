

const swaggerAutogen = require('swagger-autogen')();

const doc = {
  swagger: '2.0', // Set the Swagger version to 2.0
  info: {
    title: 'My API',
    version: '1.0.0', // You can specify your own version here
    description: 'Project Management API',
  },
  host: 'cse-341-w05-w08.onrender.com',
  schemes: ['https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(async () => {
  await import('./server.js');
});