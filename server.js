
const express = require('express');

const mongodb = require('./dbConnect');

const port = process.env.PORT || 3000;
const app = express();
const { auth } = require('express-openid-connect');


const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'a long, randomly-generated string stored in env',
  baseURL: 'http://localhost:3000',
  clientID: 'KIz1zOGx0sHsBjGo5J8rPx6Ps8jQgscR',
  issuerBaseURL: 'https://dev-ydwkfe60vah8pciu.us.auth0.com'
};

app
.use(express.json())
.use((req, res, next)=>{
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  next();
})
.use(auth(config))
.use('/', require('./routes'));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

const { requiresAuth } = require('express-openid-connect');

app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

mongodb.initDb((err, mongodb)=>{
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to Mongo Database on port ${port}`);
  }
});
