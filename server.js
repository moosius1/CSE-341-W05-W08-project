const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./dbConnect');
const port = process.env.PORT || 3000;
const app = express();



app
.use(bodyParser.json())
.use((req, res, next) =>{
    res.setHeader('Access-Control-Allow-Origin', 'TBD');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    next();
})

// make sure to COME BACK TO CHANGE THIS ONCE THE ROUTES ARE DONE! 
// .use('/', require('./routes'));



mongodb.initDb((err, mongodb)=>{
    if (err) {
        console.log(err);
    } else {
        app.listen(port);
        console.log(`Connected to MongoDB on port ${port}`);
    }
});