const tests_index = (req, res) => {
    res.render('tests', { pageTitle: 'Tests'} );
};

const tests_create = (req, res) => {
    res.render('create', { pageTitle: 'Create Test'} );
};


module.exports = {
    tests_index,
    tests_create
};