const express = require('express');
const app = express();

require('dotenv').config();

const PORT = process.env.PORT || APP_PORT;
const db = require('./db');
const bodyParser = require('body-parser');
app.use( bodyParser.json());

const passport = require('passport');
const passport_local = require('passport-local');

const logRequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] Request Made to : ${req.OriginalUrl}`);
    next(); //Move yto next phase
}

app.use(logRequest);
const personRoutes = require('./Routes/personRoutes');
const menuRoutes = require('./Routes/menuRoutes');

app.use('/person',personRoutes);
app.use('/menu',menuRoutes);


app.listen(PORT);