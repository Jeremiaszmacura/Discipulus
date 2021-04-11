const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    email: {
        type: Number,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
}, { timestamps: true });


const User = mongoose.model('User', UserSchema);

module.exports = User;