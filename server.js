
const express = require('express');

const mongodb = require('./dbConnect');
const { createNew } = require('./controllers/projects');

const port = process.env.PORT || 3000;
const app = express();





app
.use(express.json())
.use((req, res, next)=>{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
  );
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
})
.use('/', require('./routes'));



mongodb.initDb((err, mongodb)=>{
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to Mongo Database on port ${port}`);
  }
});
