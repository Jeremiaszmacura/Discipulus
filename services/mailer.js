require('dotenv').config();

const nodemailer = require('nodemailer');


const sendRegisterMail = async (RegisterMail) => {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL.toString(),  // eslint-disable-line
            pass: process.env.PASSWORD.toString(),  // eslint-disable-line
        },
    });


    const mailOptions = {
        from: 'discipulus.service@gmail.com',
        to: RegisterMail,
        subject: 'Welcome to Discipulus',
        text: 'You have successful created account.',
        html: '<p>You have successful created account.</p>'
    };


    transporter.sendMail(mailOptions, (error) => {
        if (error) {
            return console.log(error);
        }
        return console.log('email sent');
    });

};


module.exports = sendRegisterMail;
