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

    let exam = await examModel.Exam.findOne({ _id: id }).select({
        "tasks.question": 1, "tasks.questionAnswerA": 1, "tasks.questionAnswerB": 1,
        "tasks.questionAnswerC": 1, "tasks.questionAnswerD": 1
    }).lean();

    solution.save()
        .then(() => {
            res.render('exams/solveExam', { pageTitle: 'Exam Details', tasks: exam.tasks });
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