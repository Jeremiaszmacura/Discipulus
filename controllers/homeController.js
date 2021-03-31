const home_index = (req, res) => {
    res.render('home', { pageTitle: 'Home'} );
};


module.exports = {
    home_index
};