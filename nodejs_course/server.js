const express = require('express');
const app = express();

require('dotenv').config();

const PORT = process.env.PORT || APP_PORT;
const db = require('./db');
const bodyParser = require('body-parser');
app.use( bodyParser.json());

const personRoutes = require('./Routes/personRoutes');
const menuRoutes = require('./Routes/menuRoutes');

app.use('/person',personRoutes);
app.use('/menu',menuRoutes);


app.listen(PORT);