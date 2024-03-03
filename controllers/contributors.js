const { response } = require('express');
const mongodb = require('../dbConnect');
const bodyParser = require('body-parser');
const ObjectId = require('mongodb').ObjectId;
const validator = require('validator');
const { auth } = require('express-openid-connect');

//Auth0 configuration (middleware)
const authConfig = {
    authRequired: false, // Set to true if authentication is required for all routes
    auth0Logout: true,
    secret: process.env.AUTH0_SECRET,
    baseURL: process.env.BASE_URL,
    clientID: process.env.AUTH0_CLIENT_ID,
    issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
    
};

const isAuthenticated = (req, res, next) => {
    if (req.oidc.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ error: 'Unauthorized Please login'});
};

const getAll = async (req, res, next) =>{
    try{

    // isAuthenticated(req, res, next);

    const result = await mongodb.getDb().db("operationMeteor").collection('contributors').find();
    
    result.toArray().then((lists)=>{
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
        console.log(lists);
    });
    } catch (err) {
        res.status(500).json(err);
    }
};

const getSingle = async (req, res, next) =>{
    try{
    const contribId = new ObjectId(req.params.id);
    const result = await mongodb
    .getDb()
    .db("operationMeteor")
    .collection('contributors')
    .find({ _id: contribId});
result.toArray().then((lists) =>{
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
});
    } catch (err) {
    res.status(500).json(err);
}

};







const createNew = async (req, res) => {
    try {
      const { firstName, lastName, email } = req.body;
  
      // Validate email
      if (!validator.isEmail(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
      }
  
      const contributor = {
        firstName,
        lastName,
        email,
      };
  
      const response = await mongodb.getDb().db("operationMeteor").collection('contributors').insertOne(contributor);
      if (response.acknowledged) {
        res.status(201).json(response);
      } else {
        res.status(500).json(response.error || 'Error while adding contributor');
      }
    } catch (err) {
      res.status(500).json(err);
    }
  };



const updateExisting = async (req,res) =>{
    try{

        const { firstName, lastName, email } = req.body;

    // Validate email
    if (!validator.isEmail(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
      }

    const contribId = new ObjectId(req.params.id);
    //taken from create new same structure
    const contributor = {
        firstName,
        lastName,
        email,
      };

    const result = await mongodb
    .getDb()
    .db("operationMeteor")
    .collection('contributors')
    .replaceOne({ _id: contribId}, contributor);

    console.log(result);
    if (result.modifiedCount > 0){
        res.status(204).send(result);
    } else {
        res.status(500).json(result.error || 'Error while updating contributor')
    }

} catch (err) {
    res.status(500).json(err);
}
};

const deleteContributor = async(req,res) =>{
    try{
    const contribId = new ObjectId(req.params.id);
    const result = await mongodb
    .getDb()
    .db("operationMeteor")
    .collection('contributors')
    .deleteOne({ _id: contribId}, true);
    if(result.deletedCount > 0) {
        res.status(200).send(result);
    } else {
        res.status(500).json(result.error || 'Error Contributor previously deleted or does not exist') 
    }

    } catch (err) {
    res.status(500).json(err);
}
};



module.exports = {getAll, getSingle,createNew,updateExisting,deleteContributor };