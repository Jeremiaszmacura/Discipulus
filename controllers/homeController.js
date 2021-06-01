const examModel = require('../models/exam');


const homeIndex = (req, res) => {
    res.render('home', { pageTitle: 'Home'} );
};


const homePostCode = async (req, res) => {
    const exam_code = req.body.code; // takes from request value of field code and saves in exam_code variable

    // searches for exam in database and renders page with data of found exam
    await examModel.Exam.findOne({code: exam_code}).lean()
        .then(result => {
            if (result == null) {
                return res.render('home', {  error: "Invalid test code", pageTitle: 'Home'} );
            }
            res.render('exams/solveExamHome', { exam: [result.name, Math.floor(result.time / 60), result.time%60,
                    result._id, result.code, result.description], questions: result.code, pageTitle: 'Solve Exam' });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).redirect('500', { pageTitle: '500'} );
        });
};


module.exports = {
    homeIndex,
    homePostCode
};
