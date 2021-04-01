require('dotenv').config();
const express = require('express');
const expressHandlebars = require('express-handlebars');
const mongoose = require('mongoose');

const homeRoutes =  require('./routes/homeRoutes');
const testsRoutes =  require('./routes/testsRoutes');
const aboutRoutes =  require('./routes/aboutRoutes');
const dashboardRoutes =  require('./routes/dashboardRoutes');

const app = express(); // create app

const port = process.env.PORT || 3000;

// connect to mongoDB
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(port, () => console.log(`[SERVER] listening on port ${port}...`))) // dopiero po połączenu z baza danych zaczynamy nasłuchiwanie
    .catch((err) => console.log(err));


app.engine('hbs', expressHandlebars({
    defaultLayout: 'main',
    extname: 'hbs'
}));
app.set('view engine', 'hbs');


app.use(express.static('public')); // browser gets access to files in public directory


// middleware
app.use('/', homeRoutes);
app.use('/tests', testsRoutes);
app.use('/about', aboutRoutes);
app.use('/dashboard', dashboardRoutes);
app.use((req, res) => {
    res.status(404).render('404', { pageTitle: '404'} );
});
