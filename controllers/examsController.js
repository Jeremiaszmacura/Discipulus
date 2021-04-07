const Exam = require('../models/exam');


const exam_index = (req, res) => {
    Exam.find().sort({ createdAt: -1 })
        .then((result) => {
            const tempArray = [];
            if (result.length !== 0){
                result.forEach(doc => tempArray.push(doc.toObject()));
            }
            res.render('exams', {pageTitle: "Exams", exams: tempArray });
        })
        .catch((err) => {
            console.log(err);
        });
};


const exam_create = (req, res) => {
    res.render('create', { pageTitle: 'Create Exam'} );
};


const exam_details = (req, res) => {
    const id = req.params.id; // wyciąga z zapytania :id i zapisuje w zmiennej id

    Exam.findById(id)
        .then(result => {
            res.render('details', { exam: [result.name, result.time, result._id], pageTitle: 'Exam Details' })
        })
        .catch(err => {
            res.status(404).render('404', { pageTitle: '404'} );
        });
};


const exam_create_post = (req, res) => {
    const exam = new Exam(req.body);

    exam.save()
        .then((result) => {
            res.redirect('/exams');
        })
        .catch((err) => {
            console.log(err);
        });
};


const exam_delete = (req, res) => {
    const id = req.params.id;

    Exam.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/exams' });
        })
        .catch(err => {
            console.log(err);
        });
};


module.exports = {
    exam_index,
    exam_create,
    exam_create_post,
    exam_details,
    exam_delete
};