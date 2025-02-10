const mongoose = require('mongoose');

const mongoURL = 'mongodb://localhost:27017/hotels';

mongoose.connect(mongoURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
//Get the default conenction
const db = mongoose.connection;


db.on('connected',() => {
    console.log('Connected to MongoDB');
});

db.on('error',() => {
    console.log('Error while connecting to MongoDB');
});

db.on('disconnected',() => {
    console.log('Disconnected to MongoDB');
});

module.exports = db;