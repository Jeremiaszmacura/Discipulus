require('dotenv').config();
const express = require('express');
const expressHandlebars = require('express-handlebars');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const homeRoutes =  require('./routes/homeRoutes');
const examsRoutes =  require('./routes/examsRoutes');
const solutionsRoutes =  require('./routes/solutionsRoutes');
const aboutRoutes =  require('./routes/aboutRoutes');
const dashboardRoutes =  require('./routes/dashboardRoutes');
const usersRoutes = require('./routes/usersRoutes');

const { credentials } = require('./config');

const app = express(); // create app

const port = process.env.PORT || 3000;


app.engine('hbs', expressHandlebars({
    defaultLayout: 'main',
    extname: 'hbs'
}));
app.set('view engine', 'hbs');



app.use(express.static('public')); // browser gets access to files in public directory
app.use(express.urlencoded( { extended: true })); // takes all url encoded data and parse to object, which we can use in request object (req.body)
app.use(express.json()); // all data send to api will be able to access as a json
app.use(cookieParser(credentials.cookieSecret)); // cookie


// middleware
app.use('/', homeRoutes);
app.use('/users', usersRoutes);
app.use('/exams', examsRoutes);
app.use('/solutions', solutionsRoutes);
app.use('/about', aboutRoutes);
app.use('/dashboard', dashboardRoutes);
app.use((req, res) => {
    res.status(404).render('404', { pageTitle: '404'} );
});
app.use(function (err, req, res) {
    console.log(err);
    res.status(500).render('500');
});


if(require.main === module) {
    mongoose.connect(process.env.DATABASE_URL,
        { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
        .then(() => app.listen(port, () => console.log(`[SERVER] listening on port ${port}...`))) // after successful connection with database, sever start listening
        .catch((err) => console.log(err));
}


module.exports = app
