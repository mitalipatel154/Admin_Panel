const nodemailer  = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'mnp15024@gmail.com',
        pass: 'pzpp jbzi hdda olew'
    }
});

module.exports = transporter;