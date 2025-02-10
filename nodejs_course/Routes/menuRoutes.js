const express = require('express');
const router = express.Router();
const menuItem = require('../Models/MenuItem');


router.post('/', async (req, res) => {
    try{
        const data = req.body;
        const newMenu = new menuItem(data);
        const response = await newMenu.save();
        console.log('Menu details Saved');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error : 'Internal Server Error'});
    }
})

router.get('/',async (req,res) => {
    try {
        const data = await menuItem.find();
        console.log('Menu items fetched');
       res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error : 'Internal Server Error'});
    }
    
})


router.get('/:taste', async (req,res) => {
    try {
        const taste = req.params.taste; // Extract the work type from the URL parameter
        if(taste == 'Spicy' || taste == 'Sweet' || taste == 'Sour'){
            const response = await menuItem.find({ taste: taste });
            console.log('Response fetched');
            res.status(200).json(response);
        }else{
            res.status(400).json({error:'Invalid Taste'});
        }
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });

module.exports = router;