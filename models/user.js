const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    authToken: {
        type: String,
        unique: true
    },
    ownedExams: [{
        type: Schema.Types.ObjectId,
        ref: 'Exam'
    }]
}, { timestamps: true });


const User = mongoose.model('User', UserSchema);

module.exports = User;