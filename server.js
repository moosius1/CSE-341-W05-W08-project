
const express = require('express');

const mongodb = require('./dbConnect');

const port = process.env.PORT || 3000;
const app = express();





app
.use(express.json())
.use((req, res, next)=>{
  res.setHeader('Access-Control-Allow-Origin', '*');
  
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
