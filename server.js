const express = require('express');
const expressHandlebars = require('express-handlebars');
const mongoose = require('mongoose');


const app = express(); // create app


// connect to mongoDB
const dbURL = 'mongodb+srv://jeremiasz:jeremiasz1234@discipuluscluster.dvdwf.mongodb.net/Discipulus?retryWrites=true&w=majority';
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3000)) // dopiero po połączenu z baza danych zaczynamy nasłuchiwanie
    .catch((err) => console.log(err));


app.engine('hbs', expressHandlebars({
    defaultLayout: 'main',
    extname: 'hbs'
}));
app.set('view engine', 'hbs');


app.use(express.static('public')); // browser gets access to files in public directory