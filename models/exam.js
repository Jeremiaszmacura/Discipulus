const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const AnswerSchema = new Schema({
    idNumber: Number,
    name: String,
    isCorrect: Boolean,
    answer: String
}, { timestamps: true });

const TaskSchema = new Schema({
    idNumber: Number,
    question: String,
    answers: [AnswerSchema]
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
    tasks: [TaskSchema]
}, { timestamps: true });


const Exam = mongoose.model('Exam', ExamSchema);

module.exports = Exam;
