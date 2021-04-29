const Exam = require('../models/exam');


const exam_index = (req, res) => {
    Exam.find().select('__id name time description tasks').sort({ createdAt: -1 })
        .then((result) => {
            const docObjects = result.map(doc => doc.toObject());
            res.render('exams/exams', {pageTitle: "Exams", exams: docObjects });
        })
        .catch((err) => {
            console.log(err);
        });
};


const exam_create = (req, res) => {
    res.status(200).render('exams/create', { pageTitle: 'Create Exam'} );
};


const exam_details = (req, res) => {
    const id = req.params.id; // wyciąga z zapytania :id i zapisuje w zmiennej id

    Exam.findById(id)
        .then(result => {
            res.render('exams/details', { exam: [result.name, result.time, result._id], pageTitle: 'Exam Details' })
        })
        .catch(err => {
            res.status(404).render('404', { pageTitle: '404'} );
        });
};


const exam_create_post = (req, res) => {
    const exam = new Exam(req.body);

    exam.save()
        .then((result) => {
            res.render('exams/details', { exam: [result.name, result.time, result._id], pageTitle: 'Exam Details' });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).redirect('500');
        });
};


const exam_delete = (req, res) => {
    const id = req.params.id;

    Exam.findByIdAndDelete(id)
        .then(result => {
            res.status(200).json({ redirect: '/exams' });
        })
        .catch(err => {
            console.log(err);
            res.status(500).redirect('500');
        });
};


const question_create = (req, res) => {
    res.status(200).render('exams/createQuestion', { pageTitle: 'Create Question'} );
};


module.exports = {
    exam_index,
    exam_create,
    exam_create_post,
    exam_details,
    exam_delete,
    question_create
};