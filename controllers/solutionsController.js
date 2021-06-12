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
        "tasks.questionAnswerC": 1, "tasks.questionAnswerD": 1, "tasks._id": 1
    }).lean();

    solution.save()
        .then(() => {
            res.render('exams/solveExam', { pageTitle: 'Exam Details', tasks: exam.tasks, solutionId: solution._id });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).redirect('500', { pageTitle: '500'} );
        });
};


const solutionPost = async (req, res) => {
    const id = req.params.id; // take id of solution from URL

    let examObject = {};
    let points = 0;

    // finds exam which includes this question
    await examModel.Exam.find()
        .then((exams) => exams.forEach((exam) => {
            exam.solutions.forEach((solution) => {
                if(id == solution) {
                    examObject = exam;
                    res.locals.exam_id = exam._id
                }
            });
        }));

    for (let i = 0; i < req.body.answer.length; i++) {

        let answerObject = {};
        answerObject.questionId = req.body.answer[i];
        answerObject.answer = req.body.answer[i+1].toUpperCase();
        await examObject.tasks.forEach((task) => {
            if (task._id == answerObject.questionId && task.correctAnswer === answerObject.answer) {
                points++;
            }
        });

        await solutionModel.Solution.updateOne({ _id: id }, { $push: { answers: new solutionModel.Answer(answerObject)} })
            .catch((err) => {
                console.log(err);
                res.status(500).redirect('500', { pageTitle: '500'} );
            });

        i++;
    }

    await solutionModel.Solution.updateOne({ _id: id }, { score: points });

    res.render('exams/solutionResult', { pageTitle: 'Solution Result', points: points,
        percentScore: ((points/examObject.tasks.length)*100).toFixed(2) });
};


module.exports = {
    personalInformationGet,
    personalInformationPost,
    solutionPost
};