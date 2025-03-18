require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, // Send the test email to yourself
    subject: "Test Email from Fresh Meat House",
    text: "This is a test email to check SMTP settings.",
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.error("Error:", error);
    } else {
        console.log("Email sent:", info.response);
    }
});
