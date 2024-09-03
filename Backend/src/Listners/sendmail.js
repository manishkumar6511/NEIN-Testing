const nodemailer = require('nodemailer');

async function sendEmail(from, to, cc, body, subject) {
    console.log("Sending Email...");

    // Create a transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: '95.217.110.90',
        port: 25,
        secure: false, 
        auth: {
            user: 'test',
            pass: 'Mypassword1234'
        },
        connectionTimeout: 10000, // 10 seconds
        greetingTimeout: 5000, // 5 seconds
        debug: true
    });
    




    // Set up email data with unicode symbols
    let mailOptions = {
        from: `"${from}" <or.neinsoft@nipponexpress.com>`, // sender address
        to: to,
        cc: cc, 
        subject: subject,
        html: body
    };

    // Send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
    });
}


///sendEmail('Your Name', 'recipient@example.com', 'cc@example.com', '<h1>Hello World</h1>', 'Test Subject');
module.exports = sendEmail;