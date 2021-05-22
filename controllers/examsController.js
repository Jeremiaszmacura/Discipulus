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
        });
};


const examCreate = (req, res) => {
    res.status(200).render('exams/create', { pageTitle: 'Create Exam'} );
};


const examDetails = (req, res) => {
    const id = req.params.id; // takes from request value of field id and saves in id variable

    examModel.Exam.findById(id)
        .then(result => {
            res.render('exams/details', { exam: [result.name, result.time, result._id], pageTitle: 'Exam Details' })
        })
        .catch(err => {
            res.status(404).render('404', { pageTitle: '404'} );
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
            res.status(500).redirect('500');
        });
};


const examDelete = async (req, res) => {
    const id = req.params.id;

    examModel.Exam.findById(id).then((result) => {
        console.log(result);
        User.updateOne({ _id: res.locals.user._id }, { $pullAll: { ownedExams: [result._id]} }).exec();
    })

    // await User.find( { ownedExams: id } ).then((result) => {
    //     console.log(result);
    //     if(!result._id === res.locals.user._id) {
    //         res.status(422).render('users/login', { error: "You are not an owner of this exam!" });
    //     }
    // })

    // TODO

    examModel.Exam.findByIdAndDelete(id)
        .then(result => {
            res.status(200).json({ redirect: '/exams' });
        })
        .catch(err => {
            console.log(err);
            res.status(500).redirect('500');
        });
};


const questionCreate = (req, res) => {
    res.status(200).render('exams/createQuestion', { pageTitle: 'Create Question', questionId: req.params.id} );
};


const questionCreatePost = async (req, res) => {
    examModel.Exam.updateOne({ _id: req.params.id }, { $push: { tasks: new examModel.Task(req.body)} })
    .then((result) => {
        examModel.Exam.findById(req.params.id)
            .then((result2) => {
                res.render('exams/details', { exam: [result2.name, result2.time, result2._id], pageTitle: 'Exam Details' })
            })
    })
    .catch((err) => {
        console.log(err);
        res.status(500).redirect('500');
    });
}


module.exports = {
    examIndex,
    examCreate,
    examCreatePost,
    examDetails,
    examDelete,
    questionCreate,
    questionCreatePost
};