const examModel = require('../models/exam');
const User = require('../models/user');


const examIndex = (req, res) => {
    examModel.Exam.find().select('__id name time description tasks').sort({ createdAt: -1 })
        .then((result) => {
            const docObjects = result.map(doc => doc.toObject());
            res.render('exams/exams', {pageTitle: "Exams", exams: docObjects });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).redirect('500', { pageTitle: 'About'} );
        });
};


const examCreate = (req, res) => {
    res.status(200).render('exams/create', { pageTitle: 'Create Exam'} );
};


const examDetails = (req, res) => {
    const id = req.params.id; // takes from request value of field id and saves in id variable

    examModel.Exam.findById(id).lean()
        .then(result => {
            res.render('exams/details', { exam: [result.name, result.time, result._id], questions: result.tasks, pageTitle: 'Exam Details' })
        })
        .catch((err) => {
            console.log(err);
            res.status(500).redirect('500', { pageTitle: 'About'} );
        });
};


const examCreatePost = async (req, res) => {
    const exam = new examModel.Exam(req.body);
    // Adding new exams _id to User ownedExams list.
    await User.updateOne({ _id: res.locals.user._id }, { $push: { ownedExams: exam._id} });

    exam.save()
        .then((result) => {
            res.render('exams/details', { exam: [result.name, result.time, result._id], pageTitle: 'Exam Details' });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).redirect('500', { pageTitle: 'About'} );
        });
};


const examDelete = async (req, res) => {
    const id = req.params.id; // take id of exam from URL
    let isExamOwner = 1; // flag to check if user is owner of exam

    // checks if user who wants to delete exam is owner of this exam
    await User.findOne( { _id: res.locals.user._id } ).then((result) => {
        if (!result.ownedExams.includes(id)) {
            isExamOwner = 0;
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({ redirect: '500' });
    });

    if (!isExamOwner) return res.status(200).json({ redirect: '/users/login' });

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
            res.status(200).json({ redirect: '/exams' });
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
                res.render('exams/details', { exam: [result2.name, result2.time, result2._id],
                    questions: result2.tasks, pageTitle: 'Exam Details' })
            })
    })
    .catch((err) => {
        console.log(err);
        res.status(500).redirect('500', { pageTitle: 'About'} );
    });
};


const questionDelete = async (req, res) => {
    const id = req.params.id; // take id of exam from URL
    let isExamOwner = 1; // flag to check if user is owner of exam

    await examModel.Exam.find()
        .then((users) => users.forEach((exam) => {
            exam.tasks.forEach((task) => {
                if(id === task.id) {
                    res.locals.exam_id = exam._id
                }
            });
        }));

    // checks if user who wants to delete exam is owner of this exam
    await User.findOne( { _id: res.locals.user._id } ).then((result) => {
        if (!result.ownedExams.includes(res.locals.exam_id)) {
            isExamOwner = 0;
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({ redirect: '500' });
    });

    if (!isExamOwner) return res.status(200).json({ redirect: '/users/login' });

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