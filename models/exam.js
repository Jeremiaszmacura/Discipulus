const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const TaskSchema = new Schema({
    idNumber: Number,
    question: String,
    answer: String
}, { timestamps: true });

const ExamSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    time: {
        type: Number,
        required: true,
    },
    tasks: [TaskSchema]
}, { timestamps: true });


const Exam = mongoose.model('Exam', ExamSchema);

module.exports = Exam;
