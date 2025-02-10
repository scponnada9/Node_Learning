const express = require('express');
const person = require('../Models/Person');

const router = express.Router();

router.post('/',async (req,res) => {
    try {
        const data = req.body // Assuming the request body contains person data
        const newPerson = new person(data);

       const response = await newPerson.save();
       console.log('Person details saved');
       res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error : 'Internal Server Error'});
    }
    
})


router.get('/',async (req,res) => {
    try {
        const data = await person.find();
        console.log('Data fetched');
       res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error : 'Internal Server Error'});
    }
    
})

router.get('/:workType', async (req,res) => {
    try {
        const workType = req.params.workType; // Extract the work type from the URL parameter
        if(workType == 'chef' || workType == 'manager' || workType == 'waiter'){
            const response = await person.find({ work: workType });
            console.log('Response fetched');
            res.status(200).json(response);
        }else{
            res.status(400).json({error:'Invalid Work Type'});
        }
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });
    

    router.put('/:id',async (req, res) => {
        try{
        const personId = req.params.id;
        const updatedPersonData = req.body;

        const response = await person.findByIdAndUpdate(personId,updatedPersonData,{new: true,runValidators: true})

        if(!response){
            return res.status(404).json({error : 'Person Not found'});
        }
        console.log('Person details Updated');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error : 'Internal Server error'});
    }
    })
    module.exports = router;