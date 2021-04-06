const Exam = require('../models/exam');

const exam_index = (req, res) => {
    Exam.find().sort({ createdAt: -1 })
        .then((result) => {
            const tempArray = [];
            if (result.length !== 0){
                result.forEach(doc => tempArray.push(doc.toObject()));
            }
            console.log(tempArray);
            res.render('exams', {pageTitle: "Exams", exams: tempArray });
        })
        .catch((err) => {
            console.log(err);
        });
};

const exam_create = (req, res) => {
    res.render('create', { pageTitle: 'Create Exam'} );
};

const exam_create_post = (req, res) => {
    console.log(req.body);
    const exam = new Exam(req.body);


    exam.save()
        .then((result) => {
            res.redirect('/exams');
        })
        .catch((err) => {
            console.log(err);
        });
};

module.exports = {
    exam_index,
    exam_create,
    exam_create_post
};