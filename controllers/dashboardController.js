const dashboard_index = (req, res) => {
    res.render('dashboard', { pageTitle: 'Dashboard'} );
};


module.exports = {
    dashboard_index
};