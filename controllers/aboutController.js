const aboutIndex = (req, res) => {
    res.render('about', { pageTitle: 'About'} );
};


module.exports = {
    aboutIndex
};
