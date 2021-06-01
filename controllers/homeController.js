const homeIndex = (req, res) => {
    res.render('home', { pageTitle: 'Home'} );
};


module.exports = {
    homeIndex
};
