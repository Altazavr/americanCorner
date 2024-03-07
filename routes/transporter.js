const express = require('express');
const router = express.Router();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "tzenpauver@gmail.com",
    pass: "dwep zgbk stda gfwm",
  },
});

router.post("/send-email", (req, res) => {
    const { myEmail, userEmail, text } = req.body;

    const mailOptions = {
        from: myEmail,
        to: userEmail,
        subject: `Hello World ${userEmail}`,
        text: text,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent:', info.response);
            res.status(200).send('Email sent successfully');
            res.redirect('/main.html');
        }
    });
});

module.exports = router;
