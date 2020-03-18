var nodemailer = require('nodemailer');

function emailnotification (Useremail,Header,Plaintext) {
    var transporter = nodemailer.createTransport({
    secureConnection: true,
    port: 465,
    service: 'gmail',
    auth: {
        user: 'wininofficial@gmail.com',
        pass: 'comsci2560'
    },
    tls:{
        secureProtocol: "TLSv1_method",
        rejectUnauthorized:false 
    }
    });

    var mailOptions = {
        from: 'wininofficial@gmail.com',
        to: Useremail,
        subject: Header,
        text: Plaintext
        };

    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
    });
}

module.exports = {emailnotification:emailnotification}