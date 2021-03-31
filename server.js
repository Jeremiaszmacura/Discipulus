const express = require('express');
const expressHandlebars = require('express-handlebars');
const mongoose = require('mongoose');


const app = express(); // create app


app.engine('hbs', expressHandlebars({
    defaultLayout: 'main',
    extname: 'hbs'
}));
app.set('view engine', 'hbs');


app.use(express.static('public')); // browser gets access to files in public directory