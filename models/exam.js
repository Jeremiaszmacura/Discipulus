const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const TaskSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    questionAnswerA: String,
    questionAnswerB: String,
    questionAnswerC: String,
    questionAnswerD: String,
    correctAnswer: String
}, { timestamps: true });


const ExamSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    time: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    tasks: [TaskSchema],
    solutions: [{
    type: Schema.Types.ObjectId,
    ref: 'Solution'
}]
}, { timestamps: true });


const Task = mongoose.model('Task', TaskSchema);
const Exam = mongoose.model('Exam', ExamSchema);


module.exports = {
    Exam,
    Task
};
