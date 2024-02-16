const { response } = require('express');
const mongodb = require('../dbConnect');
const bodyParser = require('body-parser');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) =>{
    try{
    const result = await mongodb.getDb().db("operationMeteor").collection('projects').find();
    
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
    const projId = new ObjectId(req.params.id);
    const result = await mongodb
    .getDb()
    .db("operationMeteor")
    .collection('projects')
    .find({ _id: projId});
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
    // Validate date fields
    const startDate = validateDate(req.body.startDate);
    const nextCheckIn = validateDate(req.body.nextCheckIn);
    const projectedCompletionDate = validateDate(req.body.projectedCompletionDate);

    if (!startDate || !nextCheckIn || !projectedCompletionDate) {
      return res.status(400).json({ error: 'Invalid date format for one or more fields please use MM/DD/YYYY' });
    }

    const project = {
      name: req.body.name,
      startDate,
      nextCheckIn,
      projectedCompletionDate,
      collabEnviornment: req.body.collabEnviornment,
      weeklyTimeRequirement: req.body.weeklyTimeRequirement, 
      primaryDriver: req.body.primaryDriver
    };

    const response = await mongodb.getDb().db("operationMeteor").collection('projects').insertOne(project);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Error while creating project');
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// Helper function to validate a date string
const validateDate = (dateStr) => {
  if (!dateStr) {
    return null; // Handle missing dates
  }

  const date = new Date(dateStr);
  if (isNaN(date.getTime())) {
    return null; // Invalid date
  }

  return date;
};

const updateExisting = async (req,res) =>{
    try{

         // Validate date fields
    const startDate = validateDate(req.body.startDate);
    const nextCheckIn = validateDate(req.body.nextCheckIn);
    const projectedCompletionDate = validateDate(req.body.projectedCompletionDate);

    if (!startDate || !nextCheckIn || !projectedCompletionDate) {
      return res.status(400).json({ error: 'Invalid date format for one or more fields please use MM/DD/YYYY' });
    }

    const projId = new ObjectId(req.params.id);
    //taken from create new same structure
    const project= {
        name: req.body.name,
        startDate,
        nextCheckIn,
        projectedCompletionDate,
        collabEnviornment: req.body.collabEnviornment,
        weeklyTimeRequirement: req.body.weeklyTimeRequirement,
        primaryDriver: req.body.primaryDriver
    };

    const result = await mongodb
    .getDb()
    .db("operationMeteor")
    .collection('projects')
    .replaceOne({ _id: projId}, project);

    console.log(result);
    if (result.modifiedCount > 0){
        res.status(204).send(result);
    } else {
        res.status(500).json(result.error || 'Error while updating contact')
    }

} catch (err) {
    res.status(500).json(err);
}
};

const deleteProject = async(req,res) =>{
    try{
    const projId = new ObjectId(req.params.id);
    const result = await mongodb
    .getDb()
    .db("operationMeteor")
    .collection('projects')
    .deleteOne({ _id: projId}, true);
    if(result.deletedCount > 0) {
        res.status(200).send(result);
    } else {
        res.status(500).json(result.error || 'Error Contact previously deleted or does not exist') 
    }

    } catch (err) {
    res.status(500).json(err);
}
};



module.exports = {getAll, getSingle,createNew,updateExisting,deleteProject };