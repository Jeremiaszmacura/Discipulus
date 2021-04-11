const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const TaskSchema = new Schema({
    idNumber: Number,
    question: String,
    answer: String
}, { timestamps: true });

const AnswerSchema = new Schema({
    name: String,
    idNumber: Number,
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
    description: {
        type: String,
        required: true,
    },
    tasks: [TaskSchema],
    answers: [AnswerSchema]
}, { timestamps: true });


const Exam = mongoose.model('Exam', ExamSchema);

module.exports = Exam;
