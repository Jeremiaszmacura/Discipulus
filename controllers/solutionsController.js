const examModel = require('../models/exam');
const solutionModel = require('../models/solution');


const personalInformationGet = (req, res) => {
    res.render('exams/solveExamPersonal', {pageTitle: "Exams", examId: req.params.id});
};


const personalInformationPost = async (req, res) => {
    const id = req.params.id; // take id of exam from URL

    const solution = new solutionModel.Solution(req.body);

    // Adding new exams _id to User ownedExams list.
    await examModel.Exam.updateOne({ _id: id }, { $push: { solutions: solution._id} });

    solution.save()
        .then((result) => {
            res.render('exams/solveExam', { pageTitle: 'Exam Details' });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).redirect('500', { pageTitle: '500'} );
        });
};


module.exports = {
    personalInformationGet,
    personalInformationPost
};