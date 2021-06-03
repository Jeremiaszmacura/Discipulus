const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const AnswerSchema = new Schema({
    questionId: {
        type: Schema.Types.ObjectId,
        ref: 'Task'
    },
    answer: String
}, { timestamps: true });


const SolutionSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    answers: [AnswerSchema]
}, { timestamps: true });


const Answer = mongoose.model('Answer', AnswerSchema);
const Solution = mongoose.model('Solution', SolutionSchema);


module.exports = {
    Answer,
    Solution
};
