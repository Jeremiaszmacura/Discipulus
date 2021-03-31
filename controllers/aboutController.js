const about_index = (req, res) => {
    res.render('about', { pageTitle: 'About'} );
};


module.exports = {
    about_index
};