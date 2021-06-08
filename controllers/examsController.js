const randomstring = require("randomstring");

const examModel = require('../models/exam');
// const solutionModel = require('../models/solution');
const User = require('../models/user');


const examIndex = (req, res) => {
    examModel.Exam.find().select('__id name time description tasks').sort({ createdAt: -1 })
        .then((result) => {
            const docObjects = result.map(doc => doc.toObject());
            res.render('exams/exams', {pageTitle: "Exams", exams: docObjects });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).redirect('500', { pageTitle: '500'} );
        });
};


const examCreate = (req, res) => {
    res.status(200).render('exams/create', { pageTitle: 'Create Exam'} );
};


const examDetails = (req, res) => {
    const id = req.params.id; // takes from request value of field id and saves in id variable

    examModel.Exam.findById(id).lean()
        .then(result => {
            res.render('exams/details', { exam: [result.name, Math.floor(result.time / 60), result.time%60,
                    result._id, result.code, result.description],questions: result.tasks, pageTitle: 'Exam Details' });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).redirect('500', { pageTitle: 'About'} );
        });
};


const examCreatePost = async (req, res) => {
    // generating exam code
    req.body.code = randomstring.generate(8);

    const exam = new examModel.Exam(req.body);

    // Adding new exams _id to User ownedExams list.
    await User.updateOne({ _id: res.locals.user._id }, { $push: { ownedExams: exam._id} });

    exam.save()
        .then((result) => {
            res.render('exams/details', { exam: [result.name, Math.floor(result.time / 60), result.time%60,
                    result._id, result.code, result.description], pageTitle: 'Exam Details' });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).redirect('500', { pageTitle: '500'} );
        });
};


const examDelete = async (req, res) => {
    const id = req.params.id; // take id of exam from URL

    // checks if user who wants to delete exam is owner of this exam
    if (!res.locals.delPermission) return res.status(200).json({ redirect: '/users/login' });

    // delete exam id from user ownedExam list
    await examModel.Exam.findById(id).then((result) => {
        User.updateOne({ _id: res.locals.user._id }, { $pullAll: { ownedExams: [result._id]} }).exec();
    }).catch(err => {
        console.log(err);
        res.status(500).json({ redirect: '500' });
    });

    // delete exam
    await examModel.Exam.findByIdAndDelete(id)
        .then(() => {
            res.status(200).json({ redirect: '/exams/create' });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ redirect: '500' });
        });
};


const questionCreate = (req, res) => {
    res.status(200).render('exams/createQuestion', { pageTitle: 'Create Question', questionId: req.params.id} );
};


const questionCreatePost = async (req, res) => {
    await examModel.Exam.updateOne({ _id: req.params.id }, { $push: { tasks: new examModel.Task(req.body)} })
    .then(() => {
        examModel.Exam.findById(req.params.id).lean()
            .then((result2) => {
                res.render('exams/details', { exam: [result2.name, Math.floor(result2.time / 60), result2.time%60,
                        result2._id, result2.code, result2.description],
                    questions: result2.tasks, pageTitle: 'Exam Details' })
            })
    })
    .catch((err) => {
        console.log(err);
        res.status(500).redirect('500', { pageTitle: '500'} );
    });
};


const questionDelete = async (req, res) => {
    const id = req.params.id; // take id of exam from URL

    await examModel.Exam.find()
        .then((users) => users.forEach((exam) => {
            exam.tasks.forEach((task) => {
                if(id === task.id) {
                    res.locals.exam_id = exam._id
                }
            });
        }));

    // checks if user who wants to delete exam is owner of this exam
    if (!res.locals.delPermission) return res.status(200).json({ redirect: '/users/login' });

    await examModel.Exam.updateOne( {_id: res.locals.exam_id}, { $pull: { tasks: { _id: req.params.id} } } )
        .then(() => {
            res.status(200).json({ redirect: req.get('referer') });
        });
};


module.exports = {
    examIndex,
    examCreate,
    examCreatePost,
    examDetails,
    examDelete,
    questionCreate,
    questionCreatePost,
    questionDelete
};
