const examModel = require('../models/exam');


const dashboardIndex = async (req, res) => {
    // lean makes(convert) json object from mongoose object (handlebars can read only json object)
    await examModel.Exam.find({_id: { "$in": res.locals.user.ownedExams }}).lean().then((result) => {
        res.render('dashboard', {
            pageTitle: 'Dashboard',
            userEmail: res.locals.user.email,
            userExams: result
        });
    });
};


module.exports = {
    dashboardIndex
};