const examModel = require('../models/exam');
const solutionModel = require('../models/solution');
const User = require('../models/user');


const personalInformationGet = (req, res) => {
    console.log('personalInformationGet');
};


const personalInformationPost = (req, res) => {
    console.log('personalInformationPost');
};


module.exports = {
    personalInformationGet,
    personalInformationPost
};